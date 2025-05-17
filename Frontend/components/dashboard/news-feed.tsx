"use client"

import React, { useEffect, useState, useRef } from "react"
import { fetchAllNews, NewsItem } from "@/services/news-service"
import { Loader2 } from "lucide-react"

const categories = ["All", "Bank", "Market", "Policy", "Economy", "Tech", "Other"]

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const latestNewsRef = useRef<NewsItem[]>([])

  const loadNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedNews = await fetchAllNews()
      if (fetchedNews.length > 0) {
        setNews(fetchedNews)
        latestNewsRef.current = fetchedNews
      } else if (latestNewsRef.current.length > 0) {
        setNews(latestNewsRef.current)
      }
    } catch (err) {
      setError("Failed to load news. Showing last available news.")
      if (latestNewsRef.current.length > 0) {
        setNews(latestNewsRef.current)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
    const intervalId = setInterval(loadNews, 5 * 60 * 1000) // Refresh every 5 minutes

    return () => clearInterval(intervalId)
  }, [])

  // Filter news by selected category
  const filteredNews =
    selectedCategory === "All"
      ? news
      : news.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="max-w-full">
      {/* Category selector */}
      <nav className="flex space-x-4 overflow-x-auto border-b border-gray-300 pb-2 mb-4 px-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-1 rounded-full text-sm font-medium transition
              ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Loading state when first loading */}
      {loading && news.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin h-8 w-8 text-primary" />
        </div>
      )}

      {/* Error and no news */}
      {!loading && filteredNews.length === 0 && (
        <div className="text-center text-gray-600 py-8">
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <p>No news found in this category.</p>
          )}
        </div>
      )}

      {/* News list */}
      <div className="space-y-4 max-h-[480px] overflow-y-auto px-2">
        {error && (
          <div className="text-sm text-yellow-700 bg-yellow-100 rounded-md p-2 mb-2">
            {error}
          </div>
        )}

        {filteredNews.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold text-base text-gray-900">{item.title}</h3>
              <span className="text-xs text-gray-500 whitespace-nowrap">{item.time}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2 line-clamp-3">{item.summary}</p>
            <span className="text-xs font-medium text-blue-600">{item.source}</span>
          </a>
        ))}

        {/* Spinner during background refresh */}
        {loading && news.length > 0 && (
          <div className="flex justify-center py-4">
            <Loader2 className="animate-spin h-6 w-6 text-primary" />
          </div>
        )}
      </div>
    </div>
  )
}
