"use client"

import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, Settings, User, LineChart } from "lucide-react"
import Link from "next/link"

export function ClientAuthCheck() {
  const { user, userProfile, signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
      window.location.href = "/landing"
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Get user's display name from profile or fallback to auth user
  const displayName = userProfile?.displayName || user?.displayName || user?.email?.split("@")[0] || "User"

  // Get user's photo URL from profile or fallback to auth user
  const photoURL = userProfile?.photoURL || user?.photoURL || ""

  // Get user's initials for avatar fallback
  const getInitials = () => {
    if (displayName) {
      return displayName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    }
    return user?.email?.[0].toUpperCase() || "U"
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button size="sm" asChild>
          <Link href="/auth/login" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href="/auth/register" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Sign Up</span>
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground rounded-lg p-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={photoURL} />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-500">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}