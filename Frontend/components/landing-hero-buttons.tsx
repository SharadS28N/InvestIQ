"use client"

import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { LineChart } from "lucide-react"
import Link from "next/link"

export function LandingHeroButtons() {
  const { user } = useAuth()

  if (user) {
    // Show Dashboard button for authenticated users
    return (
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button size="lg" className="text-base px-8" asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Dashboard
          </Link>
        </Button>
      </div>
    )
  }

  // Show Get Started Free and Sign In buttons for unauthenticated users
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Button size="lg" className="text-base px-8" asChild>
        <Link href="/auth/register">Get Started Free</Link>
      </Button>
      <Button size="lg" variant="outline" className="text-base px-8" asChild>
        <Link href="/auth/login">Sign In</Link>
      </Button>
    </div>
  )
}