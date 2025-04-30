// app/landing/getUsers.ts
'use server'

import { auth } from '@/lib/firebase-admin'

export async function getUserData() {
  try {
    const result = await auth.listUsers(1000)
    const users = result.users

    // Filter out only Google OAuth users and get their profile images
    const googleUsersWithPhotos = users
      .filter(user => user.providerData.some(provider => provider.providerId === 'google.com') && user.photoURL)
      .slice(0, 4)  // Get the first 4 users' profile images (you can adjust this limit)
      .map((user) => user.photoURL!)

    const userCount = googleUsersWithPhotos.length // Or just use the length of the filtered array
    return { userCount, profileImages: googleUsersWithPhotos }
  } catch (error) {
    console.error("Error fetching Firebase users:", error)
    return { userCount: 0, profileImages: [] }
  }
}
