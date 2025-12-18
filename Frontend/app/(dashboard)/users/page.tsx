"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from "next/dynamic"
const Tabs = dynamic(() => import("@/components/ui/tabs").then(m => m.Tabs), { ssr: false })
const TabsContent = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsContent), { ssr: false })
const TabsList = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsList), { ssr: false })
const TabsTrigger = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsTrigger), { ssr: false })
const Avatar = dynamic(() => import("@/components/ui/avatar").then(m => m.Avatar), { ssr: false })
const AvatarFallback = dynamic(() => import("@/components/ui/avatar").then(m => m.AvatarFallback), { ssr: false })
const AvatarImage = dynamic(() => import("@/components/ui/avatar").then(m => m.AvatarImage), { ssr: false })
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, User, Phone, Calendar, Shield, LinkIcon } from "lucide-react"

export default function UsersPage() {
  const { user, userProfile, loading, updateUserProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "Nepal",
    dob: "",
    bio: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [meroshareData, setMeroshareData] = useState({
    dpid: "",
    clientId: "",
    name: "",
    boid: "",
    lastSynced: "",
  })

  // Initialize form with user data when available
  useEffect(() => {
    if (userProfile) {
      const nameParts = userProfile.displayName.split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      setFormData({
        firstName,
        lastName,
        email: userProfile.email || "",
        phoneNumber: userProfile.phoneNumber || "",
        address: userProfile.address || "",
        city: userProfile.city || "",
        country: userProfile.country || "Nepal",
        dob: userProfile.dob || "",
        bio: userProfile.bio || "",
      })

      // If we have meroshare data in the profile, set it
      if (userProfile.meroshare) {
        setMeroshareData({
          dpid: userProfile.meroshare.dpid || "",
          clientId: userProfile.meroshare.clientId || "",
          name: userProfile.meroshare.name || "",
          boid: userProfile.meroshare.boid || "",
          lastSynced: userProfile.meroshare.lastSynced || "",
        })
      }
    }
  }, [userProfile])

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [loading, user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setIsSubmitting(true)

    try {
      // Combine first and last name for displayName
      const displayName = `${formData.firstName} ${formData.lastName}`.trim()

      // Update user profile in Firebase
      await updateUserProfile({
        displayName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        dob: formData.dob,
        bio: formData.bio,
      })

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
        variant: "default",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 mx-auto w-full max-w-[640px] sm:max-w-5xl">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Summary Card */}
        <Card className="w-full md:w-1/3">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-2 pb-4 sm:p-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={userProfile?.photoURL || ""} alt={userProfile?.displayName || "User"} />
              <AvatarFallback className="text-lg">{getInitials(userProfile?.displayName || "User")}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg sm:text-xl font-semibold">{userProfile?.displayName}</h3>
            <p className="text-muted-foreground">{userProfile?.email}</p>

            <div className="w-full mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Member since {new Date(userProfile?.createdAt || "").toLocaleDateString()}
                </span>
              </div>
              {userProfile?.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{userProfile.phoneNumber}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Risk Profile: {userProfile?.riskProfile || "Moderate"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-4 w-full flex overflow-x-auto gap-1 sm:gap-2 sm:grid sm:grid-cols-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="meroshare">Meroshare Data</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader className="pb-1 sm:pb-2">
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="pt-2 pb-4 sm:p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={user?.providerData[0]?.providerId === "google.com"}
                      />
                      {user?.providerData[0]?.providerId === "google.com" && (
                        <p className="text-xs text-muted-foreground">Email is managed by your Google account</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" name="country" value={formData.country} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" name="bio" value={formData.bio} onChange={handleChange} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" size="sm" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="meroshare">
              <Card>
                <CardHeader className="pb-1 sm:pb-2">
                  <CardTitle>Meroshare Information</CardTitle>
                  <CardDescription>Your synced Meroshare account details</CardDescription>
                </CardHeader>
                <CardContent className="pt-2 pb-4 sm:p-6 space-y-4">
                  {meroshareData.dpid ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label className="text-muted-foreground text-sm">DP ID</Label>
                          <p>{meroshareData.dpid}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-muted-foreground text-sm">Client ID</Label>
                          <p>{meroshareData.clientId}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-sm">Name</Label>
                        <p>{meroshareData.name}</p>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-sm">BOID</Label>
                        <p>{meroshareData.boid}</p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Last synced:{" "}
                          {meroshareData.lastSynced ? new Date(meroshareData.lastSynced).toLocaleString() : "Never"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="py-6 sm:py-8 text-center">
                      <LinkIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-base sm:text-lg font-medium mb-2">No Meroshare Account Connected</h3>
                      <p className="text-muted-foreground mb-4">
                        Connect your Meroshare account to view your portfolio data
                      </p>
                      <Button size="sm">Connect Meroshare</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
