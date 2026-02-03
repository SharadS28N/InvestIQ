import React from "react"
import Link from "next/link"
import { LineChart } from "lucide-react" // adjust the import path if it's a custom icon
import HeaderNav from "@/components/header-nav"

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-svh flex-col">
      <HeaderNav className="fixed top-4 left-1/2 -translate-x-1/2 right-auto w-[95%] md:w-[96%] max-w-[1920px] rounded-full border bg-background/80 backdrop-blur-md shadow-sm z-50 transition-all duration-300" />
      <main className="flex-1 p-4 sm:p-6 pt-24 md:pt-28">{children}</main>
      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <LineChart className="h-4 w-4 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} InvestIQ. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/terms" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-xs hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

