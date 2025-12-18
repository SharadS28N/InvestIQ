"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User, signOut as firebaseSignOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { setCookie, deleteCookie } from "cookies-next"
import { useTheme } from "next-themes"
import { auth, db } from "@/lib/firebase"


// ✅ Updated UserProfile type
type UserProfile = {
  uid: string
  displayName: string
  email: string | null
  photoURL: string | null
  phoneNumber: string | null
  riskProfile: string
  createdAt: string
  lastLogin: string
  provider: string
  isNewUser?: boolean
  profileCompleted?: boolean
  theme?: "light" | "dark" | "system"
  language?: "en" | "ne"
  currency?: "NPR" | "USD"
  address?: string
  city?: string
  country?: string
  dob?: string
  bio?: string
  meroshare?: {
    dpid?: string
    clientId?: string
    name?: string
    boid?: string
    lastSynced?: string
  }
}

type AuthContextType = {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
  refreshUserProfile: () => Promise<void>
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>
  isNewUser: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signOut: async () => {},
  refreshUserProfile: async () => {},
  updateUserProfile: async () => {},
  isNewUser: false,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)
  const router = useRouter()
  const { setTheme } = useTheme()

  const fetchUserProfile = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid)
      const userSnap = await getDoc(userRef)
      return userSnap.exists() ? (userSnap.data() as UserProfile) : null
    } catch (error) {
      console.error("Error fetching user profile:", error)
      return null
    }
  }

  const saveUserProfile = async (user: User, isNewUser = false) => {
    try {
      const userRef = doc(db, "users", user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        const provider = user.providerData[0]?.providerId || "unknown"
        const providerName = provider.includes("google")
          ? "google"
          : "email"

        const newProfile: UserProfile = {
          uid: user.uid,
          displayName: user.displayName || "User",
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber || "",
          riskProfile: "moderate",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          provider: providerName,
          isNewUser: true,
          profileCompleted: false,
          theme: "light", // default theme
        }

        await setDoc(userRef, newProfile)
        setIsNewUser(true)
        return newProfile
      } else {
        const existingProfile = userSnap.data() as UserProfile
        await setDoc(userRef, {
          lastLogin: new Date().toISOString(),
          isNewUser: false,
        }, { merge: true })
        setIsNewUser(false)
        return existingProfile
      }
    } catch (error) {
      console.error("Error saving user profile:", error)
      return null
    }
  }

  const refreshUserProfile = async () => {
    if (user) {
      const profile = await fetchUserProfile(user.uid)
      if (profile) {
        setUserProfile(profile)
        setIsNewUser(profile.isNewUser || false)
  
        // Apply user-specific preferences
        if (profile.theme) setTheme(profile.theme)
        if (profile.language) {
          // apply language preference (see below)
          console.log("Apply language:", profile.language)
        }
        if (profile.currency) {
          console.log("Set currency preference:", profile.currency)
        }
      }
    }
  }
  

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) {
      console.warn("No user logged in to update profile")
      return
    }

    try {
      const userRef = doc(db, "users", user.uid)
      await setDoc(userRef, {
        ...data,
        lastLogin: new Date().toISOString(),
      }, { merge: true })

      await refreshUserProfile()
    } catch (error) {
      console.error("Error updating user profile:", error)
      throw error
    }
  }

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        setLoading(false)
      }
    }, 5000)

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        try {
          const token = await currentUser.getIdToken()
          setCookie("firebaseToken", token, { maxAge: 60 * 60 * 24 * 7 })

          const profile = await fetchUserProfile(currentUser.uid)

          if (profile) {
            setUserProfile(profile)
            setIsNewUser(profile.isNewUser || false)

            // ✅ Apply theme after login
            if (profile.theme) {
              setTheme(profile.theme)
            }
          } else {
            const newProfile = await saveUserProfile(currentUser, true)
            if (newProfile) {
              setUserProfile(newProfile)
              setIsNewUser(true)
              setTheme(newProfile.theme || "light") // ✅ Apply default if no theme
            }
          }
        } catch (error) {
          console.error("Error handling user profile:", error)
        }
      } else {
        setUserProfile(null)
        setIsNewUser(false)
        deleteCookie("firebaseToken")

        // ✅ Reset theme to default when logging out
        setTheme("light")
      }

      setLoading(false)
      clearTimeout(loadingTimeout)
    })

    return () => {
      unsubscribe()
      clearTimeout(loadingTimeout)
    }
  }, [])

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setUserProfile(null)
      deleteCookie("firebaseToken")
      setTheme("light") // ✅ Reset theme on logout
      router.push("/auth/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signOut,
        refreshUserProfile,
        updateUserProfile,
        isNewUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
