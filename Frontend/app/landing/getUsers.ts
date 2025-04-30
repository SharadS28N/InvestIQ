'use server'

import { auth } from '@/lib/firebase-admin'

export async function getUserData() {
  try {
    const result = await auth.listUsers(1000)
    const users = result.users

    // Get users with any provider who have a profile photo
    const usersWithPhotos = users
      .filter(user => user.photoURL) // Keep users who have a profile image
      .slice(0, 4) // Limit the number of images shown
      .map(user => user.photoURL!)

    const userCount = users.length // Count all users, not just those with photos
    return { userCount, profileImages: usersWithPhotos }
  } catch (error) {
    console.error("Error fetching Firebase users:", error)
    return { userCount: 0, profileImages: [] }
  }
}
