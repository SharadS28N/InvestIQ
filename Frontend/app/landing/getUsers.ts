// app/landing/getUsers.ts
'use server'

import { auth } from '@/lib/firebase-admin'

export async function getUserData() {
  try {
    const result = await auth.listUsers(1000)
    const users = result.users

    const userCount = users.length
    const profileImages = users
      .filter((u) => u.photoURL)
      .slice(0, 4)
      .map((u) => u.photoURL!)

    return { userCount, profileImages }
  } catch (error) {
    console.error("Error fetching Firebase users:", error)
    return { userCount: 0, profileImages: [] }
  }
}
