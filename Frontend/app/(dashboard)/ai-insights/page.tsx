"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"
const Tabs = dynamic(() => import("@/components/ui/tabs").then(m => m.Tabs), { ssr: false })
const TabsContent = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsContent), { ssr: false })
const TabsList = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsList), { ssr: false })
const TabsTrigger = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsTrigger), { ssr: false })
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RefreshCw, Search, Lightbulb, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
const AIInsights = dynamic(() => import("@/components/dashboard/ai-insights").then(m => m.AIInsights), { ssr: false })

export default function AIInsightsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  // This would be fetched from your AI backend in a real application
  const modelComparison = [
    {
      model: "ChatGPT",
      buy: ["NABIL", "NRIC", "UPPER"],
      sell: ["CHCL"],
      hold: ["NICA", "ADBL"],
      accuracy: 78,
    },
    {
      model: "Claude",
      buy: ["NABIL", "NRIC"],
      sell: ["CHCL", "ADBL"],
      hold: ["NICA", "UPPER"],
      accuracy: 82,
    },
    {
      model: "Gemini",
      buy: ["NABIL", "UPPER"],
      sell: ["CHCL"],
      hold: ["NICA", "NRIC", "ADBL"],
      accuracy: 75,
    },
    {
      model: "Grok",
      buy: ["NRIC"],
      sell: ["CHCL", "ADBL"],
      hold: ["NABIL", "NICA", "UPPER"],
      accuracy: 71,
    },
  ]

  return (
    <div className="flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 mx-auto w-full max-w-[640px] sm:max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">AI-powered recommendations from multiple models</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mx-auto w-full max-w-5xl">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for a stock symbol or company name..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button size="sm" className="gap-1">
          <Lightbulb className="h-4 w-4" />
          Ask AI
        </Button>
      </div>

      <Tabs defaultValue="recommendations" className="w-full mx-auto max-w-5xl">
        <TabsList className="w-full flex overflow-x-auto gap-1 sm:gap-2 sm:grid sm:grid-cols-3">
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="model-comparison">Model Comparison</TabsTrigger>
          <TabsTrigger value="performance">AI Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="mt-4">
          <AIInsights />
        </TabsContent>

        <TabsContent value="model-comparison" className="mt-4">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm font-medium">AI Model Comparison</CardTitle>
              <CardDescription>See how different AI models are analyzing the same stocks</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left font-medium">Model</th>
                      <th className="py-2 text-left font-medium">Buy Recommendations</th>
                      <th className="py-2 text-left font-medium">Sell Recommendations</th>
                      <th className="py-2 text-left font-medium">Hold Recommendations</th>
                      <th className="py-2 text-left font-medium">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelComparison.map((model) => (
                      <tr key={model.model} className="border-b">
                        <td className="py-3 font-medium">{model.model}</td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-1">
                            {model.buy.map((symbol) => (
                              <Badge
                                key={symbol}
                                variant="default"
                                className="bg-green-100 text-green-800 hover:bg-green-200"
                              >
                                {symbol}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-1">
                            {model.sell.map((symbol) => (
                              <Badge
                                key={symbol}
                                variant="default"
                                className="bg-red-100 text-red-800 hover:bg-red-200"
                              >
                                {symbol}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-1">
                            {model.hold.map((symbol) => (
                              <Badge
                                key={symbol}
                                variant="default"
                                className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              >
                                {symbol}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge variant="outline" className="font-medium">
                            {model.accuracy}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-sm font-medium">AI Performance Metrics</CardTitle>
              <CardDescription>Historical accuracy of AI recommendations</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex flex-col items-center justify-center p-4 sm:p-6 border rounded-lg">
                  <div className="text-2xl sm:text-4xl font-bold text-green-600">78%</div>
                  <div className="text-sm font-medium mt-2">Buy Accuracy</div>
                  <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
                </div>

                <div className="flex flex-col items-center justify-center p-4 sm:p-6 border rounded-lg">
                  <div className="text-2xl sm:text-4xl font-bold text-red-600">72%</div>
                  <div className="text-sm font-medium mt-2">Sell Accuracy</div>
                  <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
                </div>

                <div className="flex flex-col items-center justify-center p-4 sm:p-6 border rounded-lg">
                  <div className="text-2xl sm:text-4xl font-bold text-primary">75%</div>
                  <div className="text-sm font-medium mt-2">Overall Accuracy</div>
                  <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Recent Predictions</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 p-3 border rounded-md">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">NABIL Buy Recommendation</div>
                      <div className="text-sm text-muted-foreground">
                        Recommended at NPR 1,220 on April 15, 2023. Current price: NPR 1,250 (+2.5%)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border rounded-md">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <div className="font-medium">CHCL Sell Recommendation</div>
                      <div className="text-sm text-muted-foreground">
                        Recommended at NPR 530 on April 10, 2023. Current price: NPR 520 (-1.9%)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 border rounded-md">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="font-medium">NICA Hold Recommendation</div>
                      <div className="text-sm text-muted-foreground">
                        Recommended at NPR 875 on April 5, 2023. Current price: NPR 880 (+0.6%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
