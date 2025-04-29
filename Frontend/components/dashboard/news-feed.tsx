"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NewsFeed() {
  // This would be fetched from your backend in a real application
  const newsData = {
    market: [
      {
        title: "NEPSE Gains 15 Points as Banking Stocks Rally",
        source: "ShareSansar",
        time: "2 hours ago",
        summary:
          "The Nepal Stock Exchange gained 15 points today as banking stocks rallied following positive Q2 results from major banks.",
      },
      {
        title: "NRB Announces New Monetary Policy",
        source: "MeroLagani",
        time: "5 hours ago",
        summary:
          "Nepal Rastra Bank announced new monetary policy affecting banking sector. Interest rate corridor to be maintained.",
      },
      {
        title: "Hydropower Stocks Surge on Electricity Export News",
        source: "NEPSE News",
        time: "Yesterday",
        summary:
          "Hydropower stocks surged following news of increased electricity export to India. Upper Tamakoshi leads gains.",
      },
    ],
    company: [
      {
        title: "Nabil Bank Announces 20% Dividend",
        source: "Nabil Bank",
        time: "3 hours ago",
        summary: "Nabil Bank Limited has announced 15% cash dividend and 5% bonus shares for the fiscal year 2080/81.",
      },
      {
        title: "NIC Asia Expands Digital Banking Services",
        source: "NIC Asia",
        time: "Yesterday",
        summary:
          "NIC Asia Bank has launched new digital banking services targeting younger customers with enhanced mobile features.",
      },
      {
        title: "Chilime Hydropower Reports Record Generation",
        source: "Chilime",
        time: "2 days ago",
        summary:
          "Chilime Hydropower reported record electricity generation in the last quarter due to favorable weather conditions.",
      },
    ],
    economy: [
      {
        title: "Nepal's GDP Growth Projected at 4.5%",
        source: "Ministry of Finance",
        time: "1 day ago",
        summary:
          "The Ministry of Finance has projected Nepal's GDP growth at 4.5% for the current fiscal year, lower than previous estimates.",
      },
      {
        title: "Inflation Rises to 6.8% in Urban Areas",
        source: "Nepal Rastra Bank",
        time: "3 days ago",
        summary:
          "Nepal Rastra Bank reports inflation has risen to 6.8% in urban areas, primarily driven by food and fuel prices.",
      },
      {
        title: "Foreign Investment in Nepal Increases by 15%",
        source: "Department of Industry",
        time: "4 days ago",
        summary:
          "Foreign direct investment in Nepal has increased by 15% in the first half of the current fiscal year compared to last year.",
      },
    ],
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="market">
          <TabsList className="mb-4">
            <TabsTrigger value="market">Market News</TabsTrigger>
            <TabsTrigger value="company">Company News</TabsTrigger>
            <TabsTrigger value="economy">Economy</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-4">
            {newsData.market.map((news, index) => (
              <div key={index} className="border-l-4 border-brand-primary pl-4 py-2">
                <h4 className="font-medium">{news.title}</h4>
                <p className="text-sm text-muted-foreground">{news.summary}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  {news.time} • {news.source}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="company" className="space-y-4">
            {newsData.company.map((news, index) => (
              <div key={index} className="border-l-4 border-brand-primary pl-4 py-2">
                <h4 className="font-medium">{news.title}</h4>
                <p className="text-sm text-muted-foreground">{news.summary}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  {news.time} • {news.source}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="economy" className="space-y-4">
            {newsData.economy.map((news, index) => (
              <div key={index} className="border-l-4 border-brand-primary pl-4 py-2">
                <h4 className="font-medium">{news.title}</h4>
                <p className="text-sm text-muted-foreground">{news.summary}</p>
                <div className="text-xs text-muted-foreground mt-1">
                  {news.time} • {news.source}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
