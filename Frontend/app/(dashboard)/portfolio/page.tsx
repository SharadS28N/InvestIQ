"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"
const Tabs = dynamic(() => import("@/components/ui/tabs").then(m => m.Tabs), { ssr: false })
const TabsContent = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsContent), { ssr: false })
const TabsList = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsList), { ssr: false })
const TabsTrigger = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsTrigger), { ssr: false })
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, RefreshCw, BarChart3, Download, Upload, History } from "lucide-react"
import { useAuth } from "@/components/auth-context"

export default function PortfolioPage() {
  const { userProfile } = useAuth()

  // This would be fetched from your backend in a real application
  const portfolioData = [
    {
      symbol: "NABIL",
      name: "Nabil Bank Limited",
      quantity: 100,
      avgPrice: 1200,
      currentPrice: 1250,
      value: 125000,
      profit: 5000,
      profitPercentage: 4.17,
    },
    {
      symbol: "CHCL",
      name: "Chilime Hydropower",
      quantity: 200,
      avgPrice: 530,
      currentPrice: 520,
      value: 104000,
      profit: -2000,
      profitPercentage: -1.89,
    },
    {
      symbol: "NICA",
      name: "NIC Asia Bank",
      quantity: 150,
      avgPrice: 860,
      currentPrice: 880,
      value: 132000,
      profit: 3000,
      profitPercentage: 2.33,
    },
    {
      symbol: "NRIC",
      name: "Nepal Reinsurance",
      quantity: 120,
      avgPrice: 1100,
      currentPrice: 1120,
      value: 134400,
      profit: 2400,
      profitPercentage: 1.82,
    },
    {
      symbol: "UPPER",
      name: "Upper Tamakoshi",
      quantity: 300,
      avgPrice: 345,
      currentPrice: 340,
      value: 102000,
      profit: -1500,
      profitPercentage: -1.45,
    },
  ]

  const totalValue = portfolioData.reduce((sum, stock) => sum + stock.value, 0)
  const totalProfit = portfolioData.reduce((sum, stock) => sum + stock.profit, 0)
  const totalProfitPercentage = (totalProfit / (totalValue - totalProfit)) * 100

  // Calculate sector allocation
  const sectorAllocation = [
    { name: "Banking", value: 257000, percentage: 42.9 },
    { name: "Hydropower", value: 206000, percentage: 34.4 },
    { name: "Insurance", value: 134400, percentage: 22.5 },
    { name: "Others", value: 0, percentage: 0 },
  ]

  // Transaction history
  const transactions = [
    { date: "2023-04-20", type: "buy", symbol: "NABIL", quantity: 50, price: 1220, amount: 61000 },
    { date: "2023-04-15", type: "sell", symbol: "UPPER", quantity: 100, price: 350, amount: 35000 },
    { date: "2023-04-10", type: "buy", symbol: "NRIC", quantity: 120, price: 1100, amount: 132000 },
    { date: "2023-04-05", type: "buy", symbol: "NICA", quantity: 150, price: 860, amount: 129000 },
    { date: "2023-04-01", type: "buy", symbol: "CHCL", quantity: 200, price: 530, amount: 106000 },
  ]

  // Get user's first name for personalization
  const getFirstName = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName.split(" ")[0]
    }
    return "Investor"
  }

  return (
    <div className="flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 mx-auto w-full max-w-[640px] sm:max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">{getFirstName()}'s investment portfolio and holdings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm" className="gap-1">
            <Upload className="h-4 w-4" />
            Sync MeroShare
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-12">
        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold">NPR {totalValue.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              <Badge
                variant="outline"
                className={`
                ${
                  totalProfitPercentage >= 0
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                } 
                flex items-center gap-1`}
              >
                {totalProfitPercentage >= 0 ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>
                  {totalProfitPercentage >= 0 ? "+" : ""}
                  {totalProfitPercentage.toFixed(2)}%
                </span>
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">Overall</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-sm font-medium">Total Profit/Loss</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-4 sm:p-6">
            <div className={`text-xl sm:text-2xl font-bold ${totalProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              {totalProfit >= 0 ? "+" : ""}NPR {totalProfit.toLocaleString()}
            </div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Unrealized</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-sm font-medium">Holdings</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-4 sm:p-6">
            <div className="text-xl sm:text-2xl font-bold">{portfolioData.length}</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Companies</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="holdings" className="w-full mx-auto max-w-5xl">
        <TabsList>
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="hidden md:table-cell">Quantity</TableHead>
                    <TableHead className="hidden md:table-cell">Avg. Price</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Profit/Loss</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioData.map((stock) => (
                    <TableRow key={stock.symbol}>
                      <TableCell>
                        <div className="font-medium">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground">{stock.name}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{stock.quantity}</TableCell>
                      <TableCell className="hidden md:table-cell">NPR {stock.avgPrice}</TableCell>
                      <TableCell>NPR {stock.currentPrice}</TableCell>
                      <TableCell>NPR {stock.value.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className={`flex items-center ${stock.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {stock.profit >= 0 ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          <span>
                            {stock.profit >= 0 ? "+" : ""}NPR {stock.profit.toLocaleString()} (
                            {stock.profitPercentage >= 0 ? "+" : ""}
                            {stock.profitPercentage.toFixed(2)}%)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" title="View Chart">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sector Allocation</CardTitle>
              <CardDescription>Distribution of your portfolio across different sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorAllocation.map((sector) => (
                  <div key={sector.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{sector.name}</div>
                      <div className="flex space-x-4">
                        <div className="w-24 text-right">NPR {sector.value.toLocaleString()}</div>
                        <div className="w-16 text-right">{sector.percentage}%</div>
                      </div>
                    </div>
                    <Progress value={sector.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Record of your buy and sell transactions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.type === "buy" ? "default" : "destructive"}>
                          {transaction.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.symbol}</TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell>NPR {transaction.price}</TableCell>
                      <TableCell>NPR {transaction.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" title="View Details">
                          <History className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
