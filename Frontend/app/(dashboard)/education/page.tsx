"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, BookOpen, GraduationCap, TrendingUp, Lightbulb, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function EducationPage() {
  // This would be fetched from your backend in a real application
  const beginnerTopics = [
    {
      title: "Understanding the Stock Market",
      description: "Learn the basics of how the stock market works and why companies go public.",
      level: "Beginner",
      duration: "10 min read",
      progress: 100,
    },
    {
      title: "How to Read Financial Statements",
      description: "A beginner's guide to understanding balance sheets, income statements, and cash flow statements.",
      level: "Beginner",
      duration: "15 min read",
      progress: 75,
    },
    {
      title: "Introduction to NEPSE",
      description: "Learn about the Nepal Stock Exchange, its history, and how it operates.",
      level: "Beginner",
      duration: "8 min read",
      progress: 50,
    },
    {
      title: "Understanding Market Orders",
      description: "Learn about different types of orders you can place in the stock market.",
      level: "Beginner",
      duration: "12 min read",
      progress: 0,
    },
  ]

  const intermediateTopics = [
    {
      title: "Technical Analysis Basics",
      description: "Learn how to analyze stock charts and identify patterns.",
      level: "Intermediate",
      duration: "20 min read",
      progress: 60,
    },
    {
      title: "Fundamental Analysis",
      description: "How to evaluate a company's financial health and growth prospects.",
      level: "Intermediate",
      duration: "25 min read",
      progress: 30,
    },
    {
      title: "Portfolio Diversification",
      description: "Strategies for building a diversified portfolio to manage risk.",
      level: "Intermediate",
      duration: "15 min read",
      progress: 0,
    },
  ]

  const advancedTopics = [
    {
      title: "Advanced Trading Strategies",
      description: "Learn about advanced trading strategies used by professional traders.",
      level: "Advanced",
      duration: "30 min read",
      progress: 20,
    },
    {
      title: "Risk Management Techniques",
      description: "Advanced techniques for managing risk in your investment portfolio.",
      level: "Advanced",
      duration: "25 min read",
      progress: 0,
    },
  ]

  const glossaryTerms = [
    { term: "Bull Market", definition: "A market condition in which prices are rising or expected to rise." },
    { term: "Bear Market", definition: "A market condition in which prices are falling or expected to fall." },
    { term: "Dividend", definition: "A portion of a company's earnings that is paid to shareholders." },
    { term: "Market Capitalization", definition: "The total value of a company's outstanding shares of stock." },
    {
      term: "P/E Ratio",
      definition:
        "Price-to-earnings ratio, a valuation ratio of a company's current share price compared to its per-share earnings.",
    },
    { term: "Volume", definition: "The number of shares traded during a given period of time." },
    {
      term: "Yield",
      definition:
        "The income return on an investment, such as the interest or dividends received from holding a particular security.",
    },
    { term: "Blue Chip", definition: "A nationally recognized, well-established, and financially sound company." },
  ]

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investor Education</h1>
          <p className="text-muted-foreground">Learn about investing and the stock market</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search for topics, terms, or concepts..." className="pl-9" />
        </div>
        <Button className="gap-1">
          <Lightbulb className="h-4 w-4" />
          Ask AI Tutor
        </Button>
      </div>

      <Tabs defaultValue="learning-path" className="w-full">
        <TabsList>
          <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="learning-path" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle>Beginner</CardTitle>
                </div>
                <CardDescription>Fundamental concepts for new investors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {beginnerTopics.map((topic, index) => (
                  <div key={index} className="border rounded-md p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{topic.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {topic.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{topic.progress}%</span>
                      </div>
                      <Progress value={topic.progress} className="h-1" />
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      {topic.progress > 0 ? "Continue" : "Start Learning"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle>Intermediate</CardTitle>
                </div>
                <CardDescription>Advanced concepts for experienced investors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {intermediateTopics.map((topic, index) => (
                  <div key={index} className="border rounded-md p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{topic.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {topic.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{topic.progress}%</span>
                      </div>
                      <Progress value={topic.progress} className="h-1" />
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      {topic.progress > 0 ? "Continue" : "Start Learning"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <CardTitle>Advanced</CardTitle>
                </div>
                <CardDescription>Expert-level strategies and techniques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {advancedTopics.map((topic, index) => (
                  <div key={index} className="border rounded-md p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{topic.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {topic.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{topic.progress}%</span>
                      </div>
                      <Progress value={topic.progress} className="h-1" />
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      {topic.progress > 0 ? "Continue" : "Start Learning"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="glossary" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Investment Glossary</CardTitle>
              <CardDescription>Common terms and definitions used in the stock market</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {glossaryTerms.map((item, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <h3 className="font-medium">{item.term}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.definition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>External resources to enhance your investment knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-md p-4 space-y-2">
                  <h3 className="font-medium">NEPSE Official Website</h3>
                  <p className="text-sm text-muted-foreground">
                    Official website of the Nepal Stock Exchange with market data and announcements.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Website
                  </Button>
                </div>

                <div className="border rounded-md p-4 space-y-2">
                  <h3 className="font-medium">MeroShare</h3>
                  <p className="text-sm text-muted-foreground">
                    Official platform for online share applications and portfolio management.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Website
                  </Button>
                </div>

                <div className="border rounded-md p-4 space-y-2">
                  <h3 className="font-medium">ShareSansar</h3>
                  <p className="text-sm text-muted-foreground">
                    Leading financial portal with news, analysis, and data on Nepali stock market.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Website
                  </Button>
                </div>

                <div className="border rounded-md p-4 space-y-2">
                  <h3 className="font-medium">MeroLagani</h3>
                  <p className="text-sm text-muted-foreground">
                    Financial portal with market data, news, and analysis for Nepali investors.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Website
                  </Button>
                </div>

                <div className="border rounded-md p-4 space-y-2">
                  <h3 className="font-medium">SEBON</h3>
                  <p className="text-sm text-muted-foreground">
                    Securities Board of Nepal - regulatory body for the securities market.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Website
                  </Button>
                </div>

                <div className="border rounded-md p-4 space-y-2">
                  <h3 className="font-medium">Nepal Rastra Bank</h3>
                  <p className="text-sm text-muted-foreground">
                    Central bank of Nepal with monetary policy and financial regulations.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Visit Website
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
