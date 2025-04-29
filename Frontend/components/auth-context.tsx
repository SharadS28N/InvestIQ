"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, type User, signOut as firebaseSignOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"
import { setCookie, deleteCookie } from "cookies-next"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Define user profile type
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

  // Debug loading state
  useEffect(() => {
    console.log("Auth context loading state:", loading)
    console.log("Auth context user state:", user ? user.uid : "no user")
  }, [loading, user])

  // Function to fetch user profile from Firestore
  const fetchUserProfile = async (uid: string) => {
    try {
      const userRef = doc(db, "users", uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        return userSnap.data() as UserProfile
      } else {
        console.log("No user profile found")
        return null
      }
    } catch (error) {
      console.error("Error fetching user profile:", error)
      return null
    }
  }

  // Function to create or update user profile
  const saveUserProfile = async (user: User, isNewUser = false) => {
    try {
      const userRef = doc(db, "users", user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        // New user - create profile
        const provider = user.providerData[0]?.providerId || "unknown"
        const providerName = provider.includes("google")
          ? "google"
          : provider.includes("facebook")
            ? "facebook"
            : "email"

        const newProfile: UserProfile = {
          uid: user.uid,
          displayName: user.displayName || "User",
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber || "",
          riskProfile: "moderate", // Default risk profile
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          provider: providerName,
          isNewUser: true,
          profileCompleted: false,
        }

        await setDoc(userRef, newProfile)
        setIsNewUser(true)
        return newProfile
      } else {
        // Existing user - update last login
        const existingProfile = userSnap.data() as UserProfile
        await setDoc(
          userRef,
          {
            lastLogin: new Date().toISOString(),
            isNewUser: false,
          },
          { merge: true },
        )
        setIsNewUser(false)
        return existingProfile as UserProfile
      }
    } catch (error) {
      console.error("Error saving user profile:", error)
      return null
    }
  }

  // Function to refresh user profile
  const refreshUserProfile = async () => {
    if (user) {
      const profile = await fetchUserProfile(user.uid)
      if (profile) {
        setUserProfile(profile)
        setIsNewUser(profile.isNewUser || false)
      }
    }
  }

  // Function to update user profile
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return

    try {
      const userRef = doc(db, "users", user.uid)
      await setDoc(
        userRef,
        {
          ...data,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      )

      await refreshUserProfile()
    } catch (error) {
      console.error("Error updating profile:", error)
      throw error
    }
  }

  // Set up auth state listener
  useEffect(() => {
    console.log("Setting up auth state listener")

    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.log("Auth loading timeout reached, forcing to false")
        setLoading(false)
      }
    }, 5000)

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed:", currentUser ? "user logged in" : "no user")
      setUser(currentUser)

      if (currentUser) {
        try {
          // Set the token cookie on auth state change
          const token = await currentUser.getIdToken()
          setCookie("firebaseToken", token, { maxAge: 60 * 60 * 24 * 7 }) // 7 days

          const profile = await fetchUserProfile(currentUser.uid)
          if (profile) {
            setUserProfile(profile)
            setIsNewUser(profile.isNewUser || false)

            // Don't redirect here - let the component handle it
            // This prevents redirect loops
          } else {
            console.log("No profile found, creating new profile")
            try {
              const newProfile = await saveUserProfile(currentUser, true)
              if (newProfile) {
                setUserProfile(newProfile)
                setIsNewUser(true)
              }
            } catch (profileError) {
              console.error("Error creating profile:", profileError)
            }
          }
        } catch (error) {
          console.error("Error handling user profile:", error)
        }
      } else {
        setUserProfile(null)
        setIsNewUser(false)
        // Clear the token cookie when logged out
        deleteCookie("firebaseToken")
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
      // Clear the token cookie when logged out
      deleteCookie("firebaseToken")
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
