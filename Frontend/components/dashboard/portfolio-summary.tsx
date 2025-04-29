"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

interface PortfolioSummaryProps {
  userRiskProfile?: string
}

export function PortfolioSummary({ userRiskProfile = "moderate" }: PortfolioSummaryProps) {
  // State to store portfolio data
  const [portfolioData, setPortfolioData] = useState([
    { name: "Banking", value: 450000, percentage: 36, change: 2.4 },
    { name: "Hydropower", value: 320000, percentage: 25.7, change: 4.2 },
    { name: "Insurance", value: 210000, percentage: 16.9, change: -1.5 },
    { name: "Microfinance", value: 150000, percentage: 12, change: 0.8 },
    { name: "Others", value: 115678, percentage: 9.4, change: -0.6 },
  ])

  // Adjust portfolio data based on user's risk profile
  useEffect(() => {
    if (userRiskProfile === "conservative") {
      setPortfolioData([
        { name: "Banking", value: 550000, percentage: 44, change: 1.8 },
        { name: "Hydropower", value: 250000, percentage: 20, change: 2.2 },
        { name: "Insurance", value: 250000, percentage: 20, change: -0.5 },
        { name: "Microfinance", value: 100000, percentage: 8, change: 0.3 },
        { name: "Others", value: 100000, percentage: 8, change: -0.2 },
      ])
    } else if (userRiskProfile === "aggressive") {
      setPortfolioData([
        { name: "Banking", value: 300000, percentage: 24, change: 3.5 },
        { name: "Hydropower", value: 400000, percentage: 32, change: 5.2 },
        { name: "Insurance", value: 200000, percentage: 16, change: -2.5 },
        { name: "Microfinance", value: 200000, percentage: 16, change: 1.8 },
        { name: "Others", value: 150000, percentage: 12, change: -1.2 },
      ])
    }
    // For "moderate" profile, we keep the default values
  }, [userRiskProfile])

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between text-sm font-medium">
            <div>Sector</div>
            <div className="flex space-x-4">
              <div className="w-24 text-right">Value (NPR)</div>
              <div className="w-16 text-right">Allocation</div>
              <div className="w-16 text-right">Change</div>
            </div>
          </div>

          {portfolioData.map((sector) => (
            <div key={sector.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-medium">{sector.name}</div>
                <div className="flex space-x-4">
                  <div className="w-24 text-right">{sector.value.toLocaleString()}</div>
                  <div className="w-16 text-right">{sector.percentage}%</div>
                  <div className={`w-16 text-right ${sector.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {sector.change >= 0 ? "+" : ""}
                    {sector.change}%
                  </div>
                </div>
              </div>
              <Progress value={sector.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
