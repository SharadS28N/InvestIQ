"use client"

import { useEffect } from "react"
import { UserProfile } from "@/components/user-profile"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex flex-col p-6 space-y-6 items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="max-w-2xl">
        <UserProfile />
      </div>
    </div>
  )
}
