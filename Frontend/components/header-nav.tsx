import React from "react"
import Link from "next/link"
import { LineChart } from "lucide-react"
import { ClientAuthCheck } from "@/components/client-auth-check"

export function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/landing" className="flex items-center gap-2">
          <div className="rounded-md bg-primary p-1">
            <LineChart className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="font-semibold text-xl text-primary">
            InvestIQ
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {/* Client-side auth check */}
          <ClientAuthCheck />
        </div>
      </div>
    </header>
  )
}