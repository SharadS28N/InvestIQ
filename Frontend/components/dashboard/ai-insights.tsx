"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { useEffect, useState } from "react"

export function AIInsights() {
  const { userProfile } = useAuth()
  const [insights, setInsights] = useState([
    {
      type: "buy",
      symbol: "NABIL",
      name: "Nabil Bank Limited",
      price: 1250,
      target: 1350,
      confidence: 85,
      reasoning: "Strong Q2 results, dividend announcement expected, sector outperforming",
      models: ["ChatGPT", "Claude", "Gemini"],
    },
    {
      type: "sell",
      symbol: "CHCL",
      name: "Chilime Hydropower",
      price: 520,
      target: 480,
      confidence: 72,
      reasoning: "Technical indicators show overbought conditions, resistance at 530",
      models: ["ChatGPT", "Grok"],
    },
    {
      type: "hold",
      symbol: "NICA",
      name: "NIC Asia Bank",
      price: 880,
      target: 900,
      confidence: 65,
      reasoning: "Mixed signals - positive fundamentals but market sentiment is cautious",
      models: ["Claude", "Gemini", "Grok"],
    },
  ])

  // Adjust insights based on user's risk profile
  useEffect(() => {
    if (userProfile?.riskProfile === "conservative") {
      setInsights([
        {
          type: "buy",
          symbol: "NABIL",
          name: "Nabil Bank Limited",
          price: 1250,
          target: 1320,
          confidence: 92,
          reasoning: "Strong fundamentals, stable dividend history, low volatility",
          models: ["ChatGPT", "Claude", "Gemini"],
        },
        {
          type: "sell",
          symbol: "UPPER",
          name: "Upper Tamakoshi",
          price: 340,
          target: 310,
          confidence: 78,
          reasoning: "High volatility, uncertain regulatory environment, better alternatives available",
          models: ["ChatGPT", "Grok"],
        },
        {
          type: "hold",
          symbol: "NICA",
          name: "NIC Asia Bank",
          price: 880,
          target: 900,
          confidence: 65,
          reasoning: "Stable performance, moderate growth potential, wait for clearer signals",
          models: ["Claude", "Gemini", "Grok"],
        },
      ])
    } else if (userProfile?.riskProfile === "aggressive") {
      setInsights([
        {
          type: "buy",
          symbol: "UPPER",
          name: "Upper Tamakoshi",
          price: 340,
          target: 410,
          confidence: 75,
          reasoning: "High growth potential, recent dip creates buying opportunity, sector poised for growth",
          models: ["ChatGPT", "Grok"],
        },
        {
          type: "buy",
          symbol: "CHCL",
          name: "Chilime Hydropower",
          price: 520,
          target: 580,
          confidence: 68,
          reasoning: "Technical breakout expected, strong momentum indicators, sector rotation favors hydropower",
          models: ["Claude", "Gemini"],
        },
        {
          type: "sell",
          symbol: "NABIL",
          name: "Nabil Bank Limited",
          price: 1250,
          target: 1180,
          confidence: 62,
          reasoning: "Better growth opportunities elsewhere, banking sector expected to underperform in short term",
          models: ["ChatGPT", "Grok"],
        },
      ])
    }
    // For "moderate" profile, we keep the default values
  }, [userProfile?.riskProfile])

  return (
    <div className="space-y-6">
      {insights.map((insight) => (
        <Card
          key={insight.symbol}
          className={`border-l-4 ${
            insight.type === "buy"
              ? "border-l-green-500"
              : insight.type === "sell"
                ? "border-l-red-500"
                : "border-l-yellow-500"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{insight.symbol}</h3>
                  <span className="text-muted-foreground">{insight.name}</span>
                  <Badge
                    variant={insight.type === "buy" ? "default" : insight.type === "sell" ? "destructive" : "outline"}
                  >
                    {insight.type.toUpperCase()}
                  </Badge>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <div className="text-sm">
                    <span className="font-medium">Current: </span>
                    <span>NPR {insight.price}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Target: </span>
                    <span>NPR {insight.target}</span>
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      insight.target > insight.price ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {insight.target > insight.price ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    <span>{Math.abs(((insight.target - insight.price) / insight.price) * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-sm font-medium">AI Reasoning:</div>
                  <p className="text-sm text-muted-foreground">{insight.reasoning}</p>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <div className="text-xs text-muted-foreground">
                    Confidence: <span className="font-medium">{insight.confidence}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Models: {insight.models.join(", ")}</div>
                </div>
              </div>

              <div className="flex gap-2 self-end md:self-center">
                {insight.type === "buy" && (
                  <Button size="sm" className="gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Buy Now
                  </Button>
                )}
                {insight.type === "sell" && (
                  <Button size="sm" variant="destructive" className="gap-1">
                    <XCircle className="h-4 w-4" />
                    Sell Now
                  </Button>
                )}
                <Button size="sm" variant="outline" className="gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
