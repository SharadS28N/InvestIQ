"use client"

import dynamic from "next/dynamic"

const EducationPage = dynamic(
  () => import("@/app/(dashboard)/education/page").then(m => m.default),
  { ssr: false, loading: () => <div className="p-6 bg-gray-50 rounded-lg">Loading education...</div> }
)

export default function DynamicEducationPreview() {
  return <EducationPage />
}
