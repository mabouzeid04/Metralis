import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { WorkOrderNotifications } from './WorkOrderNotifications'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className="h-16 border-b bg-background px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden md:flex items-center text-muted-foreground text-sm">
          <span className="font-medium text-foreground">Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <WorkOrderNotifications />
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium">{user?.name ?? 'User'}</p>
          <p className="text-xs text-muted-foreground capitalize">{user?.role?.toLowerCase()}</p>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  )
}

