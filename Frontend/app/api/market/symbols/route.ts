import { NextResponse } from "next/server"
import axios from "axios"
import * as cheerio from "cheerio"

export async function GET() {
  try {
    const url = "https://merolagani.com/CompanyList.aspx"
    const res = await axios.get(url, {
      responseType: "text",
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    })
    const $ = cheerio.load(res.data)
    const symbols: { symbol: string; name?: string }[] = []

    $("table tr").each((_, el) => {
      const tds = $(el).find("td")
      if (tds.length >= 2) {
        const symbol = $(tds[0]).text().trim().toUpperCase()
        const name = $(tds[1]).text().trim()
        if (symbol && /^[A-Z0-9]+$/.test(symbol)) {
          symbols.push({ symbol, name })
        }
      }
    })

    // Deduplicate and sort
    const seen = new Set<string>()
    const out = symbols.filter((s) => {
      if (seen.has(s.symbol)) return false
      seen.add(s.symbol)
      return true
    }).sort((a, b) => a.symbol.localeCompare(b.symbol))

    return NextResponse.json({ source: "merolagani", count: out.length, symbols: out })
  } catch (e) {
    return NextResponse.json({ source: "fallback", symbols: [
      { symbol: "NEPSE", name: "Nepal Stock Exchange Index" },
      { symbol: "NABIL", name: "Nabil Bank Limited" },
      { symbol: "NICA", name: "NIC Asia Bank" },
      { symbol: "CHCL", name: "Chilime Hydropower" },
      { symbol: "UPPER", name: "Upper Tamakoshi" },
      { symbol: "NRIC", name: "National Reinsurance" },
      { symbol: "API", name: "Api Power Company" },
    ] })
  }
}

