"use client"

import dynamic from "next/dynamic"

const MarketOverview = dynamic(
  () => import("@/components/dashboard/market-overview").then(m => m.MarketOverview),
  { ssr: false, loading: () => <div className="p-6 bg-gray-50 rounded-lg">Loading dashboard...</div> }
)

export default function DynamicMarketOverview() {
  return <MarketOverview />
}
