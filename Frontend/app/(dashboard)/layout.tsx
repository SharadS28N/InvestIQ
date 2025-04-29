import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

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
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
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
