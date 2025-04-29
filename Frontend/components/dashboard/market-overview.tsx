"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function MarketOverview() {
  // This would be fetched from your backend in a real application
  const marketData = [
    { name: "NEPSE", value: 2145.67, change: -0.8, volume: "1.2B" },
    { name: "Banking", value: 1876.32, change: -1.2, volume: "450M" },
    { name: "Development Bank", value: 2345.78, change: 0.5, volume: "120M" },
    { name: "Hydropower", value: 2567.89, change: 1.8, volume: "350M" },
    { name: "Insurance", value: 3245.67, change: -0.3, volume: "180M" },
    { name: "Microfinance", value: 3876.54, change: 0.7, volume: "90M" },
    { name: "Others", value: 1456.78, change: -0.2, volume: "50M" },
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketData.map((item) => (
            <div key={item.name} className="flex flex-col space-y-2">
              <div className="text-sm font-medium text-muted-foreground">{item.name}</div>
              <div className="text-2xl font-bold">{item.value.toFixed(2)}</div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`
                  ${
                    item.change >= 0
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  } 
                  flex items-center gap-1`}
                >
                  {item.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  <span>
                    {item.change >= 0 ? "+" : ""}
                    {item.change}%
                  </span>
                </Badge>
                <span className="text-xs text-muted-foreground">Vol: {item.volume}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
