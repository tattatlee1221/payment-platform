import type { ReactNode } from "react"
import Navigation from "@/components/navigation"

interface AppLayoutProps {
  children: ReactNode
  activePage: string
  onNavigate: (page: string) => void
  onLogout: () => void
}

export default function AppLayout({ children, activePage, onNavigate, onLogout }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 w-full max-w-[600px] mx-auto p-4 pb-20">{children}</main>
      <Navigation activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}

