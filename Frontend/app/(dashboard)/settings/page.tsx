"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
const Switch = dynamic(() => import("@/components/ui/switch").then(m => m.Switch), { ssr: false })
import { Label } from "@/components/ui/label"
const Tabs = dynamic(() => import("@/components/ui/tabs").then(m => m.Tabs), { ssr: false })
const TabsContent = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsContent), { ssr: false })
const TabsList = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsList), { ssr: false })
const TabsTrigger = dynamic(() => import("@/components/ui/tabs").then(m => m.TabsTrigger), { ssr: false })
const Select = dynamic(() => import("@/components/ui/select").then(m => m.Select), { ssr: false })
const SelectContent = dynamic(() => import("@/components/ui/select").then(m => m.SelectContent), { ssr: false })
const SelectItem = dynamic(() => import("@/components/ui/select").then(m => m.SelectItem), { ssr: false })
const SelectTrigger = dynamic(() => import("@/components/ui/select").then(m => m.SelectTrigger), { ssr: false })
const SelectValue = dynamic(() => import("@/components/ui/select").then(m => m.SelectValue), { ssr: false })
import { useAuth } from "@/components/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"


export default function SettingsPage() {
  const { userProfile, updateUserProfile } = useAuth()
  const { toast } = useToast()
  const { setTheme } = useTheme()
  const [isSaving, setIsSaving] = useState(false)

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      marketAlerts: true,
      portfolioUpdates: true,
      newsDigest: false,
    },
    preferences: {
      theme: userProfile?.theme || "light",
      riskProfile: userProfile?.riskProfile || "moderate",
      language: "en",
      currency: "NPR",
    },
    privacy: {
      shareData: false,
      analyticsConsent: true,
    },
  })

  const handleNotificationChange = (key: string) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key as keyof typeof settings.notifications],
      },
    })
  }

  const handlePrivacyChange = (key: string) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key as keyof typeof settings.privacy],
      },
    })
  }

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        preferences: {
          ...prev.preferences,
          [key]: value,
        },
      }
  
      if (key === "theme") {
        setTheme(value as "light" | "dark" | "system")
      }
  
      return updated
    })
  }

  const saveSettings = async () => {
    setIsSaving(true)
    try {
      // Update user profile with new settings
      await updateUserProfile({
        riskProfile: settings.preferences.riskProfile as "conservative" | "moderate" | "aggressive",
        theme: settings.preferences.theme as "light" | "dark" | "system",
        language: settings.preferences.language as "en" | "ne",
        currency: settings.preferences.currency as "NPR" | "USD",
      })
      

      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 mx-auto w-full max-w-[640px] sm:max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="w-full flex overflow-x-auto gap-1 sm:gap-2 sm:grid sm:grid-cols-3">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={() => handleNotificationChange("email")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={() => handleNotificationChange("push")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="market-alerts" className="font-medium">
                    Market Alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">Get notified about significant market movements</p>
                </div>
                <Switch
                  id="market-alerts"
                  checked={settings.notifications.marketAlerts}
                  onCheckedChange={() => handleNotificationChange("marketAlerts")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="portfolio-updates" className="font-medium">
                    Portfolio Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">Get notified about changes in your portfolio</p>
                </div>
                <Switch
                  id="portfolio-updates"
                  checked={settings.notifications.portfolioUpdates}
                  onCheckedChange={() => handleNotificationChange("portfolioUpdates")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="news-digest" className="font-medium">
                    Weekly News Digest
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive a weekly summary of market news</p>
                </div>
                <Switch
                  id="news-digest"
                  checked={settings.notifications.newsDigest}
                  onCheckedChange={() => handleNotificationChange("newsDigest")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} size="sm" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.preferences.theme}
                    onValueChange={(value) => handlePreferenceChange("theme", value)}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="risk-profile">Risk Profile</Label>
                  <Select
                    value={settings.preferences.riskProfile}
                    onValueChange={(value) => handlePreferenceChange("riskProfile", value)}
                  >
                    <SelectTrigger id="risk-profile">
                      <SelectValue placeholder="Select risk profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => handlePreferenceChange("language", value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ne">Nepali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.preferences.currency}
                    onValueChange={(value) => handlePreferenceChange("currency", value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NPR">Nepali Rupee (NPR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} size="sm" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="share-data" className="font-medium">
                    Share Usage Data
                  </Label>
                  <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</p>
                </div>
                <Switch
                  id="share-data"
                  checked={settings.privacy.shareData}
                  onCheckedChange={() => handlePrivacyChange("shareData")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics-consent" className="font-medium">
                    Analytics Consent
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow us to use analytics to improve your experience</p>
                </div>
                <Switch
                  id="analytics-consent"
                  checked={settings.privacy.analyticsConsent}
                  onCheckedChange={() => handlePrivacyChange("analyticsConsent")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings} size="sm" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
