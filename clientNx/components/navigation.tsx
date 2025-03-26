"use client"

import { Settings, BarChart2 } from "lucide-react"

interface NavigationProps {
  activePage: string
  onNavigate: (page: string) => void
}

export default function Navigation({ activePage, onNavigate }: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
      <div className="w-full max-w-[600px] mx-auto flex items-center">
        <button
          onClick={() => onNavigate("transactions")}
          className={`flex-1 py-4 flex flex-col items-center justify-center transition-colors ${
            activePage === "transactions" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <BarChart2 className="h-5 w-5 mb-1" />
          <span className="text-sm">交易</span>
        </button>

        <button
          onClick={() => onNavigate("settings")}
          className={`flex-1 py-4 flex flex-col items-center justify-center transition-colors ${
            activePage === "settings" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Settings className="h-5 w-5 mb-1" />
          <span className="text-sm">設置</span>
        </button>
      </div>
    </div>
  )
}

