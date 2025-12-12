"use client"

import dynamic from "next/dynamic"

const AIInsights = dynamic(
  () => import("@/components/dashboard/ai-insights").then(m => m.AIInsights),
  { ssr: false, loading: () => <div className="p-6 bg-gray-50 rounded-lg">Loading AI insights...</div> }
)

export default function DynamicAIInsights() {
  return <AIInsights />
}
