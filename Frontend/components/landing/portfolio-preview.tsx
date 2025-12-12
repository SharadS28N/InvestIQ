"use client"

import React from "react"
import { LineChart, TrendingUp } from "lucide-react"

export default function PortfolioPreview() {
  return (
    <div className="relative">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl dark:bg-primary/20"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-accent1/5 rounded-full blur-3xl dark:bg-brand-accent1/20"></div>

      <div className="relative bg-white border rounded-2xl shadow-xl overflow-hidden dark:bg-gray-900 dark:border-gray-800">
        <div className="p-4 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <LineChart className="h-5 w-5 text-white dark:text-primary-200" />
            </div>
            <div className="font-semibold text-lg dark:text-white">Portfolio Overview</div>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
              <div className="text-sm text-gray-500 dark:text-gray-300">Total Value</div>
              <div className="text-xl md:text-2xl font-bold dark:text-white">NPR 1,245,678</div>
              <div className="flex items-center text-green-600 text-sm mt-1 dark:text-green-400">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+6.7%</span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg dark:bg-gray-800">
              <div className="text-sm text-gray-500 dark:text-gray-300">AI Insights</div>
              <div className="text-lg font-bold dark:text-white">3 New Recommendations</div>
              <div className="text-primary text-sm mt-1 dark:text-primary-300">View all</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center rounded-lg transition-transform duration-300 hover:scale-[1.01] hover:bg-gray-100 dark:hover:bg-gray-800/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-200">N</div>
                <div>
                  <div className="font-medium dark:text-white">NABIL</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Nabil Bank</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">NPR 1,250</div>
                <div className="text-xs text-green-600">+2.5%</div>
              </div>
            </div>

            <div className="flex justify-between items-center rounded-lg transition-transform duration-300 hover:scale-[1.01] hover:bg-gray-100 dark:hover:bg-gray-800/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium dark:bg-green-900 dark:text-green-200">U</div>
                <div>
                  <div className="font-medium dark:text-white">UPPER</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Upper Tamakoshi</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">NPR 340</div>
                <div className="text-xs text-red-600">-0.8%</div>
              </div>
            </div>

            <div className="flex justify-between items-center rounded-lg transition-transform duration-300 hover:scale-[1.01] hover:bg-gray-100 dark:hover:bg-gray-800/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium dark:bg-purple-900 dark:text-purple-200">C</div>
                <div>
                  <div className="font-medium dark:text-white">CHCL</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Chilime Hydropower</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">NPR 520</div>
                <div className="text-xs text-red-600">-1.2%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
