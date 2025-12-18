"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import dynamic from "next/dynamic"
const Tabs = dynamic(() => import("@/components/ui/tabs").then(m => m.Tabs), { ssr: false })
const TabsList = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsList), { ssr: false })
const TabsTrigger = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsTrigger), { ssr: false })
const TabsContent = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsContent), { ssr: false })
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart as ReBarChart,
  Bar,
  ComposedChart,
  Tooltip as ReTooltip,
  ReferenceLine,
  Brush,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"

type DataPoint = {
  date: string
  index: number
  ma20: number
  ma50: number
  volume: number
  rsi: number
}

type Candle = {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  // derived for rendering
  body?: number
  base?: number
  up?: boolean
}

export default function NepseChartPage() {
  const [range, setRange] = useState<"1M" | "3M" | "6M" | "1Y" | "MAX">("3M")
  const [symbol, setSymbol] = useState<string>("NEPSE")
  const [candles, setCandles] = useState<Candle[]>([])
  const [symbols, setSymbols] = useState<{ symbol: string; name?: string }[]>([])
  const [symbolFilter, setSymbolFilter] = useState("")
  const [loadingCandles, setLoadingCandles] = useState(false)
  const [errorCandles, setErrorCandles] = useState<string | null>(null)
  const [tf, setTf] = useState<"DAILY" | "5MIN" | "15MIN" | "30MIN">("DAILY")
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [barW, setBarW] = useState<number>(8)
  const [showPriceLabel, setShowPriceLabel] = useState<boolean>(true)
  const [showMA20, setShowMA20] = useState<boolean>(true)
  const [showMA50, setShowMA50] = useState<boolean>(true)

  const data = useMemo(() => {
    if (!candles.length) return [] as DataPoint[]
    // Compute MA20, MA50 and a simple RSI approximation
    const closes = candles.map((c) => c.close)
    const ma = (period: number, idx: number) => {
      const start = Math.max(0, idx - period + 1)
      const slice = closes.slice(start, idx + 1)
      const sum = slice.reduce((a, b) => a + b, 0)
      return +(sum / slice.length).toFixed(2)
    }
    const out: DataPoint[] = candles.map((c, i) => {
      // RSI approximation
      const gain = i > 0 ? Math.max(0, closes[i] - closes[i - 1]) : 0
      const loss = i > 0 ? Math.max(0, closes[i - 1] - closes[i]) : 0
      const avgGain = i > 13 ? closes.slice(i - 13, i + 1).reduce((acc, _, j) => {
        const k = i - 13 + j
        const g = k > 0 ? Math.max(0, closes[k] - closes[k - 1]) : 0
        return acc + g
      }, 0) / 14 : gain
      const avgLoss = i > 13 ? closes.slice(i - 13, i + 1).reduce((acc, _, j) => {
        const k = i - 13 + j
        const l = k > 0 ? Math.max(0, closes[k - 1] - closes[k]) : 0
        return acc + l
      }, 0) / 14 : loss
      const rs = avgLoss === 0 ? 100 : avgGain / (avgLoss || 1e-6)
      const rsi = +(100 - 100 / (1 + rs)).toFixed(2)
      return {
        date: c.date,
        index: +c.close.toFixed(2),
        ma20: ma(20, i),
        ma50: ma(50, i),
        volume: c.volume,
        rsi,
      }
    })
    return out
  }, [candles])

  // Fetch OHLC data
  useEffect(() => {
    let cancelled = false
    let first = true
    const fetchData = async () => {
      if (first) setLoadingCandles(true)
      try {
        const res = await fetch(`/api/market/ohlc?symbol=${encodeURIComponent(symbol)}&range=${range}`)
        const json = await res.json()
        const cs: Candle[] = (json.candles || []).map((c: Candle) => {
          const up = c.close >= c.open
          const body = Math.abs(c.close - c.open)
          const base = Math.min(c.open, c.close)
          return { ...c, up, body, base }
        })
        if (!cancelled) {
          setCandles(cs)
          setErrorCandles(null)
          setLastUpdated(Date.now())
        }
      } catch (e) {
        if (!cancelled) {
          setErrorCandles("Failed to load market data")
        }
      } finally {
        if (first) setLoadingCandles(false)
        first = false
      }
    }
    fetchData()
    const id = setInterval(fetchData, 30000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [symbol, range])

  // Load full symbols list
  useEffect(() => {
    const loadSymbols = async () => {
      try {
        const res = await fetch("/api/market/symbols")
        const json = await res.json()
        setSymbols(json.symbols || [])
      } catch {}
    }
    loadSymbols()
  }, [])

  const config = {
    index: { label: "NEPSE", color: "hsl(224 48% 44%)" },
    ma20: { label: "MA 20", color: "hsl(180 70% 40%)" },
    ma50: { label: "MA 50", color: "hsl(35 85% 45%)" },
    volume: { label: "Volume", color: "hsl(210 80% 55%)" },
    rsi: { label: "RSI", color: "hsl(330 70% 50%)" },
    candleUp: { label: "Up", color: "hsl(150 60% 45%)" },
    candleDown: { label: "Down", color: "hsl(0 70% 55%)" },
  }

  const patterns = useMemo(() => {
    const list: { name: string; type: "bullish" | "bearish" }[] = [
      { name: "Doji", type: "bullish" },
      { name: "Bullish Engulfing", type: "bullish" },
      { name: "Piercing Pattern", type: "bullish" },
      { name: "Tweezer Bottom", type: "bullish" },
      { name: "Rising Window", type: "bullish" },
      { name: "Hammer", type: "bullish" },
      { name: "Bullish Harami", type: "bullish" },
      { name: "Inverted Hammer", type: "bullish" },
      { name: "Morning Star", type: "bullish" },
      { name: "Bullish Marubozu", type: "bullish" },
      { name: "Abandoned Baby", type: "bullish" },
      { name: "Three White Soldiers", type: "bullish" },
      { name: "Bearish Engulfing", type: "bearish" },
      { name: "Falling Window", type: "bearish" },
      { name: "Hanging Man", type: "bearish" },
      { name: "Gravestone Doji", type: "bearish" },
      { name: "Shooting Star", type: "bearish" },
      { name: "Evening Star", type: "bearish" },
      { name: "Bearish Harami", type: "bearish" },
      { name: "Bearish Marubozu", type: "bearish" },
      { name: "Abandoned Baby", type: "bearish" },
      { name: "Three Black Crows", type: "bearish" },
    ]
    const body = (c: Candle) => Math.abs(c.close - c.open)
    const range = (c: Candle) => c.high - c.low
    const isBull = (c: Candle) => c.close > c.open
    const isBear = (c: Candle) => c.close < c.open
    const results: Record<string, number> = {}
    const n = candles.length
    for (let i = 0; i < n; i++) {
      const c = candles[i]
      const prev = i > 0 ? candles[i - 1] : undefined
      const prev2 = i > 1 ? candles[i - 2] : undefined
      const b = body(c)
      const r = range(c)
      const smallBody = b <= r * 0.1
      const longLower = Math.min(c.open, c.close) - c.low >= r * 0.5
      const longUpper = c.high - Math.max(c.open, c.close) >= r * 0.5
      if (smallBody) results["Doji"] = (results["Doji"] || 0) + 1
      if (prev && isBear(prev) && isBull(c) && c.close > prev.open && c.open < prev.close) results["Bullish Engulfing"] = (results["Bullish Engulfing"] || 0) + 1
      if (prev && isBear(prev) && isBull(c) && c.close >= (prev.open + prev.close) / 2) results["Piercing Pattern"] = (results["Piercing Pattern"] || 0) + 1
      if (prev && Math.abs(prev.low - c.low) / r < 0.02) results["Tweezer Bottom"] = (results["Tweezer Bottom"] || 0) + 1
      if (prev && c.low > prev.high) results["Rising Window"] = (results["Rising Window"] || 0) + 1
      if (longLower && b <= r * 0.3) results["Hammer"] = (results["Hammer"] || 0) + 1
      if (prev && isBear(prev) && isBull(c) && c.open > prev.close && c.close < prev.open) results["Bullish Harami"] = (results["Bullish Harami"] || 0) + 1
      if (longUpper && b <= r * 0.3 && isBull(c)) results["Inverted Hammer"] = (results["Inverted Hammer"] || 0) + 1
      if (prev2 && prev && isBear(prev2) && Math.abs(body(prev)) <= range(prev) * 0.3 && isBull(c) && c.close > prev2.open) results["Morning Star"] = (results["Morning Star"] || 0) + 1
      if (b >= r * 0.8 && isBull(c)) results["Bullish Marubozu"] = (results["Bullish Marubozu"] || 0) + 1
      if (prev2 && isBear(prev2) && smallBody && isBull(c)) results["Abandoned Baby"] = (results["Abandoned Baby"] || 0) + 1
      if (i > 2) {
        const a = candles[i - 2]
        const b2 = candles[i - 1]
        const c3 = candles[i]
        if (isBull(a) && isBull(b2) && isBull(c3) && c3.close > b2.close && b2.close > a.close) results["Three White Soldiers"] = (results["Three White Soldiers"] || 0) + 1
      }
      if (prev && isBull(prev) && isBear(c) && c.close < prev.open && c.open > prev.close) results["Bearish Engulfing"] = (results["Bearish Engulfing"] || 0) + 1
      if (prev && c.high < prev.low) results["Falling Window"] = (results["Falling Window"] || 0) + 1
      if (longUpper && b <= r * 0.3 && isBear(c)) results["Hanging Man"] = (results["Hanging Man"] || 0) + 1
      if (longUpper && smallBody) results["Gravestone Doji"] = (results["Gravestone Doji"] || 0) + 1
      if (longUpper && b <= r * 0.3) results["Shooting Star"] = (results["Shooting Star"] || 0) + 1
      if (prev2 && prev && isBull(prev2) && Math.abs(body(prev)) <= range(prev) * 0.3 && isBear(c) && c.close < prev2.close) results["Evening Star"] = (results["Evening Star"] || 0) + 1
      if (prev && isBull(prev) && isBear(c) && c.open < prev.close && c.close > prev.open) results["Bearish Harami"] = (results["Bearish Harami"] || 0) + 1
      if (b >= r * 0.8 && isBear(c)) results["Bearish Marubozu"] = (results["Bearish Marubozu"] || 0) + 1
      if (prev2 && isBull(prev2) && smallBody && isBear(c)) results["Abandoned Baby"] = (results["Abandoned Baby"] || 0) + 1
      if (i > 2) {
        const a = candles[i - 2]
        const b2 = candles[i - 1]
        const c3 = candles[i]
        if (isBear(a) && isBear(b2) && isBear(c3) && c3.close < b2.close && b2.close < a.close) results["Three Black Crows"] = (results["Three Black Crows"] || 0) + 1
      }
    }
    const bullish = list.filter((x) => x.type === "bullish").map((x) => ({ ...x, count: results[x.name] || 0 }))
    const bearish = list.filter((x) => x.type === "bearish").map((x) => ({ ...x, count: results[x.name] || 0 }))
    return { bullish, bearish }
  }, [candles])

  const latestClose = useMemo(() => (candles.length ? candles[candles.length - 1].close : undefined), [candles])
  const latestDate = useMemo(() => (candles.length ? candles[candles.length - 1].date : undefined), [candles])
  const isFresh = useMemo(() => (lastUpdated ? Date.now() - lastUpdated < 60000 : false), [lastUpdated])

  return (
    <div className="mx-auto w-full flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-[640px] sm:max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">NEPSE Chart</h1>
          <p className="text-muted-foreground">Interactive charts and technical indicators</p>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-64 justify-between">
                {symbol}
                <span className="text-muted-foreground">Search</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-80" align="end">
              <Command>
                <CommandInput placeholder="Search company or symbol" value={symbolFilter} onValueChange={setSymbolFilter} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Symbols">
                    {symbols
                      .filter((s) =>
                        symbolFilter
                          ? s.symbol.toLowerCase().includes(symbolFilter.toLowerCase()) ||
                            (s.name || "").toLowerCase().includes(symbolFilter.toLowerCase())
                          : true
                      )
                      .slice(0, 50)
                      .map((s) => (
                        <CommandItem key={s.symbol} onSelect={() => { setSymbol(s.symbol); setSymbolFilter(""); }}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{s.symbol}</span>
                            <span className="text-muted-foreground text-xs">{s.name ?? ""}</span>
                          </div>
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {(["1M", "3M", "6M", "1Y", "MAX"] as const).map((r) => (
            <Button
              key={r}
              variant={r === range ? "default" : "outline"}
              size="sm"
              onClick={() => setRange(r)}
            >
              {r}
            </Button>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <PanelGroup direction="horizontal" className="gap-4">
          <Panel defaultSize={8} minSize={6}>
            <div className="flex flex-col items-center gap-2 w-10">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setBarW((w) => Math.min(18, w + 2))}>+</Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowPriceLabel((v) => !v)}>T</Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setRange("3M")}>↗</Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">⚙</Button>
                </PopoverTrigger>
                <PopoverContent className="w-44">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Body width</span>
                      <Input type="number" value={barW} onChange={(e) => setBarW(Number(e.target.value) || 8)} className="h-7 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Show MA20</span>
                      <Button variant="outline" size="sm" onClick={() => setShowMA20((v) => !v)}>{showMA20 ? "On" : "Off"}</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Show MA50</span>
                      <Button variant="outline" size="sm" onClick={() => setShowMA50((v) => !v)}>{showMA50 ? "On" : "Off"}</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Panel>
          <PanelResizeHandle className="w-2 bg-muted" />
          <Panel defaultSize={60} minSize={40} className="min-w-0">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full flex overflow-x-auto gap-1 sm:gap-2 sm:grid sm:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="candlestick">Candlestick</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="indicators">Indicators</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Price</CardTitle>
              <CardDescription>{symbol} close with moving averages</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingCandles && !candles.length ? (
                <div className="h-[260px] sm:h-[380px]">
                  <Skeleton className="w-full h-full" />
                </div>
              ) : errorCandles && !candles.length ? (
                <div className="text-sm text-destructive">{errorCandles}</div>
              ) : (
                <ChartContainer config={config} className="w-full overflow-hidden">
                  <ReLineChart data={data} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="index" stroke="var(--color-index)" strokeWidth={2} dot={false} />
                    {showMA20 && (
                      <Line type="monotone" dataKey="ma20" stroke="var(--color-ma20)" strokeWidth={1.5} dot={false} />
                    )}
                    {showMA50 && (
                      <Line type="monotone" dataKey="ma50" stroke="var(--color-ma50)" strokeWidth={1.5} dot={false} />
                    )}
                  </ReLineChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candlestick" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{symbol} Candlestick</CardTitle>
              <CardDescription>
                OHLC with real-time refresh
                {latestClose !== undefined && (
                  <span className="ml-2">
                    Latest: {latestClose} on {latestDate}
                    {isFresh ? <Badge className="ml-2">LIVE</Badge> : null}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingCandles && !candles.length ? (
                <div className="h-[260px] sm:h-[380px]">
                  <Skeleton className="w-full h-full" />
                </div>
              ) : errorCandles && !candles.length ? (
                <div className="text-sm text-destructive">{errorCandles}</div>
              ) : (
                <PanelGroup direction="vertical" className="h-[420px] sm:h-[560px]">
                  <Panel defaultSize={70} minSize={50}>
                    <ChartContainer config={config} className="w-full h-full overflow-hidden aspect-auto">
                      <ComposedChart data={candles} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
                    <ReTooltip content={<ChartTooltipContent />} />
                    {latestClose !== undefined && (
                      <ReferenceLine y={latestClose} stroke="var(--color-index)" strokeDasharray="3 3" />
                    )}
                    <Bar
                      dataKey="body"
                      barSize={barW}
                      shape={(props: any) => {
                        const { x, y, width, height, payload } = props
                        const up = payload.up
                        const body = Math.max(0.0001, Math.abs(payload.close - payload.open))
                        const ppu = height / body
                            const bodyTopY = y
                            const bodyBottomY = y + height
                            const wickTopY = bodyTopY - (payload.high - Math.max(payload.open, payload.close)) * ppu
                            const wickBottomY = bodyBottomY + (Math.min(payload.open, payload.close) - payload.low) * ppu
                            const cx = x + width / 2
                            const bw = Math.max(2, Math.min(width - 2, 8))
                            const bx = cx - bw / 2
                            const fill = up ? "var(--color-candleUp)" : "var(--color-candleDown)"
                            return (
                              <g>
                                <line x1={cx} x2={cx} y1={wickTopY} y2={bodyTopY} stroke={fill} strokeWidth={1} />
                                <line x1={cx} x2={cx} y1={bodyBottomY} y2={wickBottomY} stroke={fill} strokeWidth={1} />
                            <rect x={bx} y={bodyTopY} width={bw} height={height} fill={fill} opacity={0.9} />
                          </g>
                        )
                      }}
                    />
                    <Brush dataKey="date" height={24} travellerWidth={12} />
                  </ComposedChart>
                </ChartContainer>
              </Panel>
                  <PanelResizeHandle className="h-2 bg-muted" />
                  <Panel defaultSize={30} minSize={20}>
                    <ChartContainer config={config} className="w-full h-full overflow-hidden aspect-auto">
                      <ReBarChart data={candles} margin={{ left: 12, right: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} hide />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="volume" fill="var(--color-volume)" />
                      </ReBarChart>
                    </ChartContainer>
                  </Panel>
                </PanelGroup>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volume" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Volume</CardTitle>
              <CardDescription>Daily traded volume</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingCandles && !candles.length ? (
                <div className="h-[260px] sm:h-[380px]">
                  <Skeleton className="w-full h-full" />
                </div>
              ) : errorCandles && !candles.length ? (
                <div className="text-sm text-destructive">{errorCandles}</div>
              ) : (
                <ChartContainer config={config} className="w-full overflow-hidden">
                  <ReBarChart data={data} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="volume" fill="var(--color-volume)" />
                  </ReBarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indicators" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>RSI</CardTitle>
                <CardDescription>Relative Strength Index</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingCandles && !candles.length ? (
                  <div className="h-[260px] sm:h-[380px]">
                    <Skeleton className="w-full h-full" />
                  </div>
                ) : errorCandles && !candles.length ? (
                  <div className="text-sm text-destructive">{errorCandles}</div>
                ) : (
                  <ChartContainer config={config} className="w-full overflow-hidden">
                    <ReLineChart data={data} margin={{ left: 12, right: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="rsi" stroke="var(--color-rsi)" strokeWidth={2} dot={false} />
                    </ReLineChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Moving Averages</CardTitle>
                <CardDescription>MA20 vs MA50</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingCandles && !candles.length ? (
                  <div className="h-[260px] sm:h-[380px]">
                    <Skeleton className="w-full h-full" />
                  </div>
                ) : errorCandles && !candles.length ? (
                  <div className="text-sm text-destructive">{errorCandles}</div>
                ) : (
                  <ChartContainer config={config} className="w-full overflow-hidden">
                    <ReLineChart data={data} margin={{ left: 12, right: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="ma20" stroke="var(--color-ma20)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="ma50" stroke="var(--color-ma50)" strokeWidth={2} dot={false} />
                    </ReLineChart>
                  </ChartContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        </Tabs>
          </Panel>
          <PanelResizeHandle className="w-2 bg-muted" />
          <Panel defaultSize={32} minSize={22}>
            <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Candlesticks</CardTitle>
              <CardDescription>Pattern signals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                {["DAILY", "5MIN", "15MIN", "30MIN"].map((t) => (
                  <Button key={t} size="sm" variant={tf === t ? "default" : "outline"} onClick={() => setTf(t as any)}>
                    {t === "DAILY" ? "DAILY" : t.replace("MIN", " MINUTE")}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <div className="text-xs font-medium mb-1">Bullish</div>
                  <div className="flex flex-wrap gap-2">
                    {patterns.bullish.map((p) => (
                      <Badge key={p.name} className="bg-green-100 text-green-800">
                        {p.name} <span className="ml-1">{p.count}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xs font-medium mb-1">Bearish</div>
                  <div className="flex flex-wrap gap-2">
                    {patterns.bearish.map((p) => (
                      <Badge key={p.name} className="bg-red-100 text-red-800">
                        {p.name} <span className="ml-1">{p.count}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
            </div>
          </Panel>
        </PanelGroup>
      </div>
      <div className="md:hidden space-y-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex-wrap gap-1 overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="candlestick">Candlestick</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
          </TabsList>
          {/* Existing TabsContent blocks apply for mobile too */}
        </Tabs>
        <Card>
          <CardHeader>
            <CardTitle>Candlesticks</CardTitle>
            <CardDescription>Pattern signals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              {['DAILY','5MIN','15MIN','30MIN'].map((t) => (
                <Button key={t} size="sm" variant={tf === t ? 'default' : 'outline'} onClick={() => setTf(t as any)}>
                  {t === 'DAILY' ? 'DAILY' : t.replace('MIN',' MINUTE')}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-xs font-medium mb-1">Bullish</div>
                <div className="flex flex-wrap gap-2">
                  {patterns.bullish.map((p) => (
                    <Badge key={p.name} className="bg-green-100 text-green-800">
                      {p.name} <span className="ml-1">{p.count}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xs font-medium mb-1">Bearish</div>
                <div className="flex flex-wrap gap-2">
                  {patterns.bearish.map((p) => (
                    <Badge key={p.name} className="bg-red-100 text-red-800">
                      {p.name} <span className="ml-1">{p.count}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

