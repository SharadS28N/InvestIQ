"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Lightbulb, RefreshCw } from "lucide-react"
import dynamic from "next/dynamic"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"

// Dynamically load heavy dashboard components on client only for faster SSR and better mobile performance
const PortfolioSummary = dynamic(() => import("@/components/dashboard/portfolio-summary").then(mod => mod.PortfolioSummary), { ssr: false, loading: () => <div className="p-4">Loading portfolio...</div> })
const AIInsights = dynamic(() => import("@/components/dashboard/ai-insights").then(mod => mod.AIInsights), { ssr: false, loading: () => <div className="p-4">Loading AI insights...</div> })
const MarketOverview = dynamic(() => import("@/components/dashboard/market-overview").then(mod => mod.MarketOverview), { ssr: false, loading: () => <div className="p-4">Loading market data...</div> })
const WatchlistTable = dynamic(() => import("@/components/dashboard/watchlist-table").then(mod => mod.WatchlistTable), { ssr: false, loading: () => <div className="p-4">Loading watchlist...</div> })
const NewsFeed = dynamic(() => import("@/components/dashboard/news-feed"), { ssr: false, loading: () => <div className="p-4">Loading news...</div> })
const RecentActivity = dynamic(() => import("@/components/dashboard/recent-activity").then(mod => mod.RecentActivity), { ssr: false, loading: () => <div className="p-4">Loading activity...</div> })

export default function Dashboard() {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [portfolioData, setPortfolioData] = useState({
    value: 1245678,
    change: 2.5,
    gain: 78450,
    gainPercentage: 6.7,
    nepseIndex: 2145.67,
    nepseChange: -0.8,
  })

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API call to refresh data
    setTimeout(() => {
      // Update with slightly different values to show refresh worked
      setPortfolioData((prev) => ({
        ...prev,
        value: prev.value + Math.floor(Math.random() * 10000 - 5000),
        change: +(prev.change + (Math.random() * 0.4 - 0.2)).toFixed(1),
        nepseIndex: +(prev.nepseIndex + (Math.random() * 2 - 1)).toFixed(2),
        nepseChange: +(prev.nepseChange + (Math.random() * 0.4 - 0.2)).toFixed(1),
      }))
      setIsRefreshing(false)
    }, 1500)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US")
  }

  // Get user's first name for greeting
  const getFirstName = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName.split(" ")[0]
    }
    return "Investor"
  }

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  if (loading) {
    return (
      <div className="flex flex-col p-6 space-y-6 items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {getGreeting()}, {getFirstName()}. Here's your investment overview.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-1" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button size="sm" className="gap-1" onClick={() => router.push("/ai-insights")}>
            <Lightbulb className="h-4 w-4" />
            AI Insights
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">NPR {formatCurrency(portfolioData.value)}</div>
            <div className="flex items-center mt-1">
              <Badge
                variant="outline"
                className={`${
                  portfolioData.change >= 0
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                } flex items-center gap-1`}
              >
                {portfolioData.change >= 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>
                  {portfolioData.change >= 0 ? "+" : ""}
                  {portfolioData.change}%
                </span>
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">Today</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+NPR {formatCurrency(portfolioData.gain)}</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>+{portfolioData.gainPercentage}%</span>
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">All time</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">NEPSE Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioData.nepseIndex}</div>
            <div className="flex items-center mt-1">
              <Badge
                variant="outline"
                className={`${
                  portfolioData.nepseChange >= 0
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                } flex items-center gap-1`}
              >
                {portfolioData.nepseChange >= 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>
                  {portfolioData.nepseChange >= 0 ? "+" : ""}
                  {portfolioData.nepseChange}%
                </span>
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">Today</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="w-full flex overflow-x-auto gap-2 sm:grid sm:grid-cols-5">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="mt-4">
          <PortfolioSummary userRiskProfile={userProfile?.riskProfile || "moderate"} />
        </TabsContent>

        <TabsContent value="market" className="mt-4">
          <MarketOverview />
        </TabsContent>

        <TabsContent value="ai-insights" className="mt-4">
          <AIInsights />
        </TabsContent>

        <TabsContent value="news" className="mt-4">
          <NewsFeed />
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <RecentActivity />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Watchlist</CardTitle>
              <CardDescription>Companies you're tracking with AI-powered insights</CardDescription>
            </CardHeader>
            <CardContent>
              <WatchlistTable />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Market News</CardTitle>
              <CardDescription>Real-time updates from financial news sources</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <NewsFeed />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
