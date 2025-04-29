"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Eye, BarChart3 } from "lucide-react"

export function WatchlistTable() {
  // This would be fetched from your backend in a real application
  const watchlistData = [
    {
      symbol: "NABIL",
      name: "Nabil Bank Limited",
      price: 1250,
      change: 2.5,
      volume: "120K",
      aiSignal: "buy",
      confidence: 85,
    },
    {
      symbol: "CHCL",
      name: "Chilime Hydropower",
      price: 520,
      change: -1.2,
      volume: "85K",
      aiSignal: "sell",
      confidence: 72,
    },
    { symbol: "NICA", name: "NIC Asia Bank", price: 880, change: 0.5, volume: "95K", aiSignal: "hold", confidence: 65 },
    {
      symbol: "NRIC",
      name: "Nepal Reinsurance",
      price: 1120,
      change: 3.2,
      volume: "150K",
      aiSignal: "buy",
      confidence: 78,
    },
    {
      symbol: "UPPER",
      name: "Upper Tamakoshi",
      price: 340,
      change: -0.8,
      volume: "200K",
      aiSignal: "hold",
      confidence: 60,
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Change</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>AI Signal</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {watchlistData.map((stock) => (
          <TableRow key={stock.symbol}>
            <TableCell>
              <div className="font-medium">{stock.symbol}</div>
              <div className="text-xs text-muted-foreground">{stock.name}</div>
            </TableCell>
            <TableCell>NPR {stock.price}</TableCell>
            <TableCell>
              <div className={`flex items-center ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stock.change >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                <span>
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change}%
                </span>
              </div>
            </TableCell>
            <TableCell>{stock.volume}</TableCell>
            <TableCell>
              <Badge
                variant={stock.aiSignal === "buy" ? "default" : stock.aiSignal === "sell" ? "destructive" : "outline"}
                className="flex items-center gap-1 w-fit"
              >
                {stock.aiSignal.toUpperCase()}
                <span className="text-xs">({stock.confidence}%)</span>
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" title="View Details">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="View Chart">
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
