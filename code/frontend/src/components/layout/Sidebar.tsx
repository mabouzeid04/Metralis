import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Settings,
  Wrench,
  FileText,
  Package,
  Users,
  Cog,
  Bot,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { user } = useAuth()
  const { t } = useTranslation('nav')

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t('dashboard') },
    { to: '/machines', icon: Settings, label: t('machines') },
    { to: '/work-orders', icon: Wrench, label: t('workOrders') },
    { to: '/parts', icon: Package, label: t('parts') },
    { to: '/documents', icon: FileText, label: t('documents') },
    { to: '/ai', icon: Bot, label: t('ai') },
  ]

  return (
    <aside className={cn("w-64 bg-background border-r h-full flex flex-col", className)}>
      <div className="p-6 h-16 flex items-center justify-center border-b">
        <img src="/metralis-logo.png" alt="Metralis" className="h-10" />
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t space-y-1">
        {user?.role === 'ADMIN' && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <Users className="w-4 h-4" />
            {t('accessManagement')}
          </NavLink>
        )}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )
          }
        >
          <Cog className="w-4 h-4" />
          {t('settings')}
        </NavLink>
      </div>
    </aside>
  )
}

