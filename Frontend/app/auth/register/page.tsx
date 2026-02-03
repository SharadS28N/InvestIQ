"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-context"

// Import Firebase
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"

// Add this import at the top
import { setCookie } from "cookies-next"
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

const googleProvider = new GoogleAuthProvider()

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [riskProfile, setRiskProfile] = useState("moderate")
  const [termsAccepted, setTermsAccepted] = useState(false)

  // Add a timeout to prevent infinite loading
  useEffect(() => {
    // If still loading after 5 seconds, force loading state to false
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log("Loading timeout reached, forcing loading state to false")
        setIsLoading(false)
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }, [isLoading])

  const router = useRouter()
  const { toast } = useToast()
  const { user, loading } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  
  // Update handleRegister
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (!termsAccepted) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      })

      const token = await userCredential.user.getIdToken()
      setCookie("firebaseToken", token, { maxAge: 60 * 60 * 24 * 7 })

      toast({
        title: "Account created successfully",
        description: "Welcome to InvestIQ!",
      })

      router.push("/profile-setup")
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update handleSocialSignup
  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true)

    try {
      let result
      if (provider === "google") {
        result = await signInWithPopup(auth, googleProvider)
      }
      if (result && result.user) {
        const email = result.user.email
        const uid = result.user.uid
        const ok = await checkAndHandleDuplicateEmail(email, uid)
        if (!ok) return
        const token = await result.user.getIdToken()
        setCookie("firebaseToken", token, { maxAge: 60 * 60 * 24 * 7 })
      }

      toast({
        title: "Account created successfully",
        description: "Welcome to InvestIQ!",
      })

      router.push("/dashboard")
    } catch (error: any) {
      const code = error?.code
      const isUnauthorized = code === "auth/unauthorized-domain"
      toast({
        title: isUnauthorized ? "Unauthorized domain" : "Signup failed",
        description: isUnauthorized
          ? `Add this origin to Firebase Auth authorized domains: ${window.location.origin}`
          : (error.message || "An error occurred during signup."),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loading && user) {
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-support2 to-white dark:from-background dark:to-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <LineChart className="h-6 w-6 text-primary-foreground" />
            </div>
            <Link href="/" className="font-semibold text-xl text-primary">
              InvestIQ
            </Link>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Sign up to start investing smarter</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Choose how you want to create your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-1">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialSignup("google")}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or register with email</span>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="98XXXXXXXX"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="risk-profile">Risk Profile</Label>
                <Select value={riskProfile} onValueChange={setRiskProfile}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your risk tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

const checkAndHandleDuplicateEmail = async (email: string|null, currentUid: string|null) => {
  if (!email || !currentUid) return false;
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let oldestProfile: { createdAt: string } | null = null;
  let oldestUid: string | null = null;
  let duplicateUids: string[] = [];
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data() as { createdAt: string };
    if (!oldestProfile || new Date(data.createdAt) < new Date(oldestProfile.createdAt)) {
      oldestProfile = data;
      oldestUid = docSnap.id;
    }
    if (docSnap.id !== currentUid) {
      duplicateUids.push(docSnap.id);
    }
  });
  for (const uid of duplicateUids) {
    await deleteDoc(doc(db, "users", uid));
  }
  if (oldestUid && oldestUid !== currentUid) {
    window.location.href = `/profile?uid=${oldestUid}`;
    return false;
  }
  return true;
}
