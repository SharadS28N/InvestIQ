"use client"

import dynamic from 'next/dynamic'

const PortfolioPreview = dynamic(() => import('@/components/landing/portfolio-preview'), { ssr: false, loading: () => <div className="p-6 bg-gray-50 rounded-lg">Loading preview...</div> })

export default function DynamicPortfolioPreview() {
  return <PortfolioPreview />
}
