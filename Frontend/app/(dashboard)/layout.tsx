import type React from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Link from "next/link"
import { LineChart } from "lucide-react"
import { ClientAuthCheck } from "@/components/client-auth-check"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Server-side check for authentication
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("__session")
  const firebaseToken = cookieStore.get("firebaseToken")

  // If no auth cookie is found, redirect to login but prevent loops
  if (!authCookie && !firebaseToken) {
    // Check if we're already trying to prevent a redirect loop
    const url = new URL(headers().get("x-url") || "http://localhost:3000")
    const noRedirect = url.searchParams.get("noRedirect") === "true"

    if (!noRedirect) {
      redirect("/auth/login?noRedirect=true")
    }
    // If noRedirect is true, we'll render the page anyway to break the loop
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-svh">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-14 items-center px-4 lg:px-6">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Link href="/" className="hidden md:flex items-center gap-2">
                  <div className="rounded-md bg-primary p-1">
                    <LineChart className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-semibold text-lg text-primary">InvestIQ</span>
                </Link>
              </div>
              <div className="ml-auto hidden md:block">
                <ClientAuthCheck />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}

// Add this function to get headers
function headers() {
  // This is a workaround since we can't directly access headers in a Server Component
  return {
    get: (name: string) => {
      // In a real implementation, you'd get this from the request
      // For now, return a default value
      return null
    },
  }
}
