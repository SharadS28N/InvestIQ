"use client"

import {
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  Home,
  LineChart,
  LogOut,
  MessageSquareText,
  Settings,
  User,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "./auth-context"
import { useToast } from "./ui/use-toast"

export function AppSidebar() {
  const { user, userProfile, signOut } = useAuth()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })
      // Force navigation to login page
      window.location.href = "/auth/login"
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out.",
        variant: "destructive",
      })
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

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary p-1">
            <LineChart className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="font-semibold text-xl text-primary">InvestIQ</div>
        </div>
        <div className="text-xs text-muted-foreground">Invest Smarter, Grow Better</div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/portfolio">
                    <BriefcaseBusiness className="h-4 w-4" />
                    <span>Portfolio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/ai-insights">
                    <MessageSquareText className="h-4 w-4" />
                    <span>AI Insights</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/education">
                    <BookOpen className="h-4 w-4" />
                    <span>Learn</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/users">
                    <Users className="h-4 w-4" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={photoURL || ""} alt={displayName} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <span className="truncate max-w-[120px]">{displayName}</span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
