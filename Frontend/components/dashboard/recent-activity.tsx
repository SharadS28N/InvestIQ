"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react"

type BuyActivity = {
  type: "buy"
  symbol: string
  quantity: number
  price: number
  total: number
  time: string
  status: "completed" | "pending" | "rejected"
}
type SellActivity = {
  type: "sell"
  symbol: string
  quantity: number
  price: number
  total: number
  time: string
  status: "completed" | "pending" | "rejected"
}
type DividendActivity = {
  type: "dividend"
  symbol: string
  amount: number
  time: string
  status: "completed" | "pending" | "rejected"
}
type AISuggestionActivity = {
  type: "ai_suggestion"
  symbol: string
  action: "buy" | "sell"
  confidence: number
  time: string
  status: "completed" | "pending" | "rejected"
}
type Activity = BuyActivity | SellActivity | DividendActivity | AISuggestionActivity

export function RecentActivity() {

  const activityData: Activity[] = [
    {
      type: "buy",
      symbol: "NABIL",
      quantity: 10,
      price: 1240,
      total: 12400,
      time: "Today, 11:45 AM",
      status: "completed",
    },
    {
      type: "ai_suggestion",
      symbol: "CHCL",
      action: "sell",
      confidence: 72,
      time: "Today, 10:30 AM",
      status: "pending",
    },
    {
      type: "sell",
      symbol: "UPPER",
      quantity: 50,
      price: 345,
      total: 17250,
      time: "Yesterday, 2:15 PM",
      status: "completed",
    },
    {
      type: "dividend",
      symbol: "NICA",
      amount: 1500,
      time: "Yesterday, 9:00 AM",
      status: "completed",
    },
    {
      type: "ai_suggestion",
      symbol: "NRIC",
      action: "buy",
      confidence: 78,
      time: "2 days ago",
      status: "rejected",
    },
  ]

  const getActivityIcon = (activity: Activity) => {
    if (activity.status === "completed") {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    } else if (activity.status === "rejected") {
      return <XCircle className="h-4 w-4 text-red-500" />
    } else if (activity.status === "pending") {
      return <Clock className="h-4 w-4 text-yellow-500" />
    } else {
      return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getActivityDescription = (activity: Activity) => {
    if (activity.type === "buy") {
      return `Bought ${activity.quantity} shares of ${activity.symbol} at NPR ${activity.price}`
    } else if (activity.type === "sell") {
      return `Sold ${activity.quantity} shares of ${activity.symbol} at NPR ${activity.price}`
    } else if (activity.type === "dividend") {
      return `Received dividend of NPR ${activity.amount} from ${activity.symbol}`
    } else if (activity.type === "ai_suggestion") {
      return `AI suggested to ${activity.action} ${activity.symbol} with ${activity.confidence}% confidence`
    }
    return ""
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {activityData.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5">{getActivityIcon(activity)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.symbol}</span>
                  <Badge
                    variant={
                      activity.type === "buy" || (activity.type === "ai_suggestion" && activity.action === "buy")
                        ? "default"
                        : activity.type === "sell" || (activity.type === "ai_suggestion" && activity.action === "sell")
                          ? "destructive"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {activity.type === "ai_suggestion" ? "AI" : activity.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{getActivityDescription(activity)}</p>
                <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
              </div>
              {isTradeActivity(activity) && (
                <div className="text-right">
                  <div className="font-medium">NPR {activity.total.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    {activity.quantity} × {activity.price}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function isTradeActivity(activity: Activity): activity is BuyActivity | SellActivity {
  return activity.type === "buy" || activity.type === "sell"
}
