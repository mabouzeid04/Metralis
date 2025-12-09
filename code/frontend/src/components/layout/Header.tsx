import { Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { WorkOrderNotifications } from './WorkOrderNotifications'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth()
  const { t } = useTranslation(['nav', 'common'])
  const roleLabel = user?.role
    ? t(`common:roles.${user.role.toLowerCase()}`, { defaultValue: user.role.toLowerCase() })
    : t('common:roles.user')

  return (
    <header className="h-16 border-b bg-background px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <WorkOrderNotifications />
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium">{user?.name ?? t('common:roles.user')}</p>
          <p className="text-xs text-muted-foreground capitalize">{roleLabel}</p>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          {t('nav:logout')}
        </Button>
      </div>
    </header>
  )
}

