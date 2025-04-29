"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
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
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Reset Password</h1>
          <p className="text-sm text-muted-foreground">Enter your email to receive a password reset link</p>
        </div>

        <Card>
          {isSubmitted ? (
            <CardContent className="pt-6 pb-6 text-center">
              <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-600"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Check your email</h2>
              <p className="text-muted-foreground mb-4">
                We've sent a password reset link to your email address. Please check your inbox.
              </p>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Return to login</Link>
                </Button>
                <Button variant="link" onClick={() => setIsSubmitted(false)}>
                  Try another email
                </Button>
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>Enter your email to reset your password</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                  <div className="text-center text-sm">
                    Remember your password?{" "}
                    <Link href="/auth/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
