"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart } from "lucide-react"

export default function ProfileSetupPage() {
  const { user, userProfile, updateUserProfile, loading, isNewUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    displayName: "",
    phoneNumber: "",
    riskProfile: "moderate",
  })

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!loading && !user) {
      router.push("/auth/login")
    }

    // If user is authenticated but not a new user, redirect to dashboard
    if (!loading && user && !isNewUser) {
      router.push("/dashboard")
    }

    // Pre-fill form with any existing data
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || "",
        phoneNumber: userProfile.phoneNumber || "",
        riskProfile: userProfile.riskProfile || "moderate",
      })
    }
  }, [user, userProfile, loading, isNewUser, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRiskProfileChange = (value: string) => {
    setFormData((prev) => ({ ...prev, riskProfile: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.displayName) {
      toast({
        title: "Name required",
        description: "Please provide your name to continue.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await updateUserProfile({
        displayName: formData.displayName,
        phoneNumber: formData.phoneNumber,
        riskProfile: formData.riskProfile,
        profileCompleted: true,
        isNewUser: false,
      })

      toast({
        title: "Profile completed!",
        description: "Your profile has been set up successfully.",
      })

      // Redirect to dashboard after successful profile setup
      router.push("/dashboard")
    } catch (error) {
      console.error("Error setting up profile:", error)
      toast({
        title: "Setup failed",
        description: "There was an error setting up your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get initials for avatar
  const getInitials = () => {
    if (formData.displayName) {
      return formData.displayName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    }
    return user?.email?.[0].toUpperCase() || "U"
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-support2 to-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <LineChart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="font-semibold text-2xl text-primary">InvestIQ</div>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Complete Your Profile</h1>
          <p className="text-sm text-muted-foreground">Just a few more details to get started</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to InvestIQ!</CardTitle>
            <CardDescription>Please provide some additional information to personalize your experience</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={userProfile?.photoURL || ""} />
                  <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">Your Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={userProfile?.email || ""} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskProfile">Investment Risk Profile</Label>
                <Select value={formData.riskProfile} onValueChange={handleRiskProfileChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your risk tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative - Lower risk, stable returns</SelectItem>
                    <SelectItem value="moderate">Moderate - Balanced risk and returns</SelectItem>
                    <SelectItem value="aggressive">Aggressive - Higher risk, potential for higher returns</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  This helps us tailor investment recommendations to your preferences
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Complete Setup & Continue"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
