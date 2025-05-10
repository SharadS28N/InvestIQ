"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RefreshCw, ExternalLink } from "lucide-react"
import { fetchAllNews, fallbackNewsData, type NewsData, type NewsItem } from "@/services/news-service"

export function NewsFeed() {
  const [newsData, setNewsData] = useState<NewsData>(fallbackNewsData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchAllNews()
      setNewsData(data)
    } catch (err) {
      console.error("Error fetching news:", err)
      setError("Failed to fetch latest news. Using fallback data.")
      setNewsData(fallbackNewsData)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch news on component mount
  useEffect(() => {
    fetchNews()
  }, [])

  // Function to open news URL in a new tab
  const openNewsUrl = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Financial News</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1" 
            onClick={fetchNews} 
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
        
        {error && (
          <div className="text-sm text-amber-600 mb-4 p-2 bg-amber-50 rounded border border-amber-200">
            {error}
          </div>
        )}
        
        <Tabs defaultValue="market">
          <TabsList className="mb-4">
            <TabsTrigger value="market">Market News</TabsTrigger>
            <TabsTrigger value="company">Company News</TabsTrigger>
            <TabsTrigger value="economy">Economy</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-4">
            {newsData.market.length > 0 ? (
              newsData.market.map((news, index) => (
                <div 
                  key={index} 
                  className="border-l-4 border-brand-primary pl-4 py-2 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => openNewsUrl(news.url)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{news.title}</h4>
                    {news.url && <ExternalLink className="h-3 w-3 text-muted-foreground mt-1 ml-1 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{news.summary}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {news.time} • {news.source}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                {isLoading ? "Loading news..." : "No market news available"}
              </div>
            )}
          </TabsContent>

          <TabsContent value="company" className="space-y-4">
            {newsData.company.length > 0 ? (
              newsData.company.map((news, index) => (
                <div 
                  key={index} 
                  className="border-l-4 border-brand-primary pl-4 py-2 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => openNewsUrl(news.url)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{news.title}</h4>
                    {news.url && <ExternalLink className="h-3 w-3 text-muted-foreground mt-1 ml-1 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{news.summary}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {news.time} • {news.source}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                {isLoading ? "Loading news..." : "No company news available"}
              </div>
            )}
          </TabsContent>

          <TabsContent value="economy" className="space-y-4">
            {newsData.economy.length > 0 ? (
              newsData.economy.map((news, index) => (
                <div 
                  key={index} 
                  className="border-l-4 border-brand-primary pl-4 py-2 cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => openNewsUrl(news.url)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{news.title}</h4>
                    {news.url && <ExternalLink className="h-3 w-3 text-muted-foreground mt-1 ml-1 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{news.summary}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {news.time} • {news.source}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                {isLoading ? "Loading news..." : "No economy news available"}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
