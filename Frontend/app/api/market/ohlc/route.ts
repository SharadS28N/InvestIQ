import { NextResponse } from "next/server"
import axios from "axios"
import * as cheerio from "cheerio"

type Candle = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

function seedFromSymbol(symbol: string) {
  let h = 0
  for (let i = 0; i < symbol.length; i++) {
    h = (h * 31 + symbol.charCodeAt(i)) >>> 0
  }
  return h
}

function generateSyntheticOHLC(symbol: string, days: number): Candle[] {
  const seed = seedFromSymbol(symbol)
  const rng = (() => {
    let s = seed || 123456789
    return () => {
      // xorshift32
      s ^= s << 13
      s ^= s >>> 17
      s ^= s << 5
      return (s >>> 0) / 0xffffffff
    }
  })()

  const out: Candle[] = []
  const start = new Date()
  start.setDate(start.getDate() - days)
  let price = 500 + (rng() * 1000) // base per symbol
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const drift = (rng() - 0.5) * 6
    const volatility = 8 + rng() * 12
    const open = Math.max(50, price + (rng() - 0.5) * 4)
    const high = Math.max(open, open + rng() * volatility)
    const low = Math.max(5, Math.min(open, open - rng() * volatility))
    const close = Math.max(low, Math.min(high, open + drift))
    const volume = Math.floor(100000 + rng() * 900000)
    out.push({
      date: d.toISOString().slice(0, 10),
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume,
    })
    price = close
  }
  return out
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const symbol = url.searchParams.get("symbol") || "NEPSE"
  const range = url.searchParams.get("range") || "3M"

  const daysMap: Record<string, number> = { "1M": 30, "3M": 90, "6M": 180, "1Y": 365, MAX: 720 }
  const days = daysMap[range] || 90

  // Try live scrape (Merolagani Price History)
  try {
    const target = `https://merolagani.com/CompanyDetail.aspx?symbol=${encodeURIComponent(symbol)}`
    const res = await axios.get(target, {
      responseType: "text",
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    })
    const $ = cheerio.load(res.data)
    // Find any table with headers containing Open/High/Low/Close
    let headerIdx: Record<string, number> | null = null
    const rows: Candle[] = []
    $("table").each((_, tbl) => {
      const headers = $(tbl).find("thead th").map((__, th) => $(th).text().trim().toLowerCase()).get()
      if (headers.length && ["open","high","low","close"].every((h) => headers.includes(h))) {
        headerIdx = {
          date: headers.indexOf("date"),
          open: headers.indexOf("open"),
          high: headers.indexOf("high"),
          low: headers.indexOf("low"),
          close: headers.indexOf("close"),
          volume: headers.indexOf("turnover") >= 0 ? headers.indexOf("turnover") : headers.indexOf("volume"),
        }
        $(tbl).find("tbody tr").each((___, tr) => {
          const tds = $(tr).find("td")
          if (tds.length >= 5) {
            const get = (i: number) => i >= 0 ? $(tds[i]).text().trim() : ""
            const date = get(headerIdx!.date)
            const open = parseFloat(get(headerIdx!.open).replace(/[,]/g, ""))
            const high = parseFloat(get(headerIdx!.high).replace(/[,]/g, ""))
            const low = parseFloat(get(headerIdx!.low).replace(/[,]/g, ""))
            const close = parseFloat(get(headerIdx!.close).replace(/[,]/g, ""))
            const volume = parseInt(get(headerIdx!.volume).replace(/[,]/g, "")) || 0
            if (date && [open, high, low, close].every((n) => !isNaN(n))) {
              rows.push({ date, open, high, low, close, volume })
            }
          }
        })
      }
    })
    // Use last N days
    const sorted = rows.sort((a, b) => a.date.localeCompare(b.date))
    const candles = sorted.slice(-days)
    if (candles.length > 10) {
      return NextResponse.json({ symbol: symbol.toUpperCase(), range, candles, source: "merolagani" })
    }
  } catch {}

  // Secondary attempt: Merolagani chart handler (JSON)
  try {
    const handler = `https://merolagani.com/Handlers/Chart.ashx?symbol=${encodeURIComponent(symbol)}`
    const res = await axios.get(handler, {
      responseType: "json",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    })
    const rows = Array.isArray(res.data) ? res.data : []
    const mapped: Candle[] = rows
      .map((r: any) => ({
        date: (r.Date || r.date || "").toString().slice(0, 10),
        open: Number(r.Open ?? r.open),
        high: Number(r.High ?? r.high),
        low: Number(r.Low ?? r.low),
        close: Number(r.Close ?? r.close),
        volume: Number(r.Volume ?? r.volume ?? 0),
      }))
      .filter((c) => c.date && [c.open, c.high, c.low, c.close].every((n) => !isNaN(n)))
    const sorted = mapped.sort((a, b) => a.date.localeCompare(b.date))
    const candles = sorted.slice(-days)
    if (candles.length > 10) {
      return NextResponse.json({ symbol: symbol.toUpperCase(), range, candles, source: "merolagani-chart" })
    }
  } catch {}

  const candles = generateSyntheticOHLC(symbol.toUpperCase(), days)
  return NextResponse.json({ symbol: symbol.toUpperCase(), range, candles, source: "synthetic" })
}
