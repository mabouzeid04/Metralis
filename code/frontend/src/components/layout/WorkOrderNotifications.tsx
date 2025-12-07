import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, Bell, Inbox, Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { useAuth } from '@/contexts/AuthContext'
import { api } from '@/lib/api'
import { cn } from '@/lib/utils'

type WorkOrderAssignment = {
  id: string
  title: string
  status: string
  priority: string
  createdAt: string
  machine?: {
    name?: string | null
  } | null
}

type ApiWorkOrder = WorkOrderAssignment & {
  assignedTo?: {
    id?: string | null
  } | null
}

export function WorkOrderNotifications() {
  const { user } = useAuth()
  const userId = user?.id
  const { t } = useTranslation()
  const [assignments, setAssignments] = useState<WorkOrderAssignment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAssignments = useCallback(async () => {
    if (!userId) {
      setAssignments([])
      setError(null)
      return
    }

    setLoading(true)
    try {
      const response = await api.get('/work-orders')
      const workOrders = (response.data?.data ?? []) as ApiWorkOrder[]
      const assigned = workOrders
        .filter((wo) => wo.assignedTo?.id === userId && wo.status !== 'CLOSED')
        .sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )

      setAssignments(assigned)
      setError(null)
    } catch (err) {
      console.error('Failed to load work order notifications', err)
      setError('Unable to load notifications')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    void fetchAssignments()
  }, [fetchAssignments])

  const count = assignments.length
  const badgeLabel = count > 9 ? '9+' : String(count || '')

  const formatDate = (value?: string) => {
    if (!value) return '-'
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return '-'
    return parsed.toLocaleDateString()
  }

  const renderContent = () => {
    if (!userId) {
      return (
        <div className="p-3 text-sm text-muted-foreground">{t('notifications.signIn')}</div>
      )
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-start gap-2 p-3">
          <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
          <div className="space-y-1 text-sm">
            <p className="font-medium text-destructive">{t('notifications.unableToLoad')}</p>
            <button
              className="text-xs text-muted-foreground hover:text-foreground underline"
              onClick={(event) => {
                event.preventDefault()
                void fetchAssignments()
              }}
            >
              {t('notifications.retry')}
            </button>
          </div>
        </div>
      )
    }

    if (!assignments.length) {
      return (
        <div className="flex items-center gap-3 p-3 text-sm text-muted-foreground">
          <Inbox className="h-4 w-4" />
          <div>
            <p className="font-medium text-foreground">{t('notifications.noneTitle')}</p>
            <p className="text-xs text-muted-foreground">{t('notifications.noneBody')}</p>
          </div>
        </div>
      )
    }

    return (
      <div className="max-h-80 w-[320px] space-y-1 overflow-y-auto p-1">
        {assignments.map((wo) => (
          <DropdownMenuItem key={wo.id} asChild className="flex flex-col items-start gap-1">
            <Link to={`/work-orders/${wo.id}`} className="flex w-full flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium leading-none truncate">{wo.title}</span>
                <StatusBadge status={wo.status} className="text-[10px] px-2 py-0" />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="truncate">{wo.machine?.name || t('status.noMachine')}</span>
                <span>{formatDate(wo.createdAt)}</span>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <Badge
              variant="destructive"
              className={cn(
                'absolute -right-1 -top-1 h-5 min-w-[1.25rem] px-1',
                'flex items-center justify-center text-[10px] leading-none',
              )}
            >
              {badgeLabel}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[340px] p-0">
        <DropdownMenuLabel className="flex flex-col items-start gap-1">
          <span className="text-sm font-semibold">{t('notifications.title')}</span>
          <span className="text-xs text-muted-foreground">{t('notifications.workOrders')}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {renderContent()}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center text-xs font-medium">
          <Link to="/work-orders">{t('notifications.goToWorkOrders')}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
