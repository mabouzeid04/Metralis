import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Desktop Sidebar */}
      <Sidebar className="app-sidebar hidden md:flex fixed inset-y-0 left-0 z-20" />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
        <div
          className={cn(
            'app-sidebar-drawer fixed inset-y-0 left-0 z-40 w-64 bg-background transform transition-transform duration-200 ease-in-out md:hidden',
            document.dir === 'rtl' ? 'border-l' : 'border-r',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="app-main flex-1 flex flex-col md:pl-64 min-h-screen transition-all duration-200">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="mx-auto max-w-6xl w-full">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}

