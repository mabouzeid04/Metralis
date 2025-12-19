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
  assignedToId?: string | null
  machine?: {
    name?: string | null
  } | null
}

type ApiWorkOrder = WorkOrderAssignment & {
  assignedTo?: {
    id?: string | null
  } | null
  assignedToId?: string | null
}

const STORAGE_KEY_PREFIX = 'metralis_seen_notifications_'

const loadSeenFromStorage = (userId?: string | null) => {
  if (!userId) return new Set<string>()
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${userId}`)
    if (!raw) return new Set<string>()
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return new Set<string>(parsed.filter((id) => typeof id === 'string'))
    }
  } catch {
    // ignore malformed storage
  }
  return new Set<string>()
}

const persistSeenToStorage = (userId: string | null | undefined, seen: Set<string>) => {
  if (!userId) return
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${userId}`, JSON.stringify(Array.from(seen)))
  } catch {
    // ignore storage write errors
  }
}

export function WorkOrderNotifications() {
  const { user } = useAuth()
  const userId = user?.id
  const { t } = useTranslation()
  const [assignments, setAssignments] = useState<WorkOrderAssignment[]>([])
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set())
  const [open, setOpen] = useState(false)
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
        .filter((wo) => (wo.assignedToId === userId || wo.assignedTo?.id === userId) && wo.status !== 'CLOSED')
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

  const unreadCount = assignments.filter((wo) => !seenIds.has(wo.id)).length
  const badgeLabel = unreadCount > 9 ? '9+' : String(unreadCount || '')

  // Load persisted seen IDs when user changes
  useEffect(() => {
    setSeenIds(loadSeenFromStorage(userId))
  }, [userId])

  // Prune seen IDs to current assignments once data is loaded; avoid wiping seen during loading/empty states
  useEffect(() => {
    if (!userId) return
    if (assignments.length === 0) return
    setSeenIds((prev) => {
      const assignmentIds = new Set(assignments.map((wo) => wo.id))
      const next = new Set<string>()
      let changed = false
      prev.forEach((id) => {
        if (assignmentIds.has(id)) {
          next.add(id)
        } else {
          changed = true
        }
      })
      if (changed) {
        persistSeenToStorage(userId, next)
      }
      return next
    })
  }, [assignments, userId])

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
        <div className={`flex items-center gap-3 p-3 text-sm text-muted-foreground ${document.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Inbox className="h-4 w-4" />
          <div className={document.dir === 'rtl' ? 'text-right' : ''}>
            <p className="font-medium text-foreground">{t('notifications.noneTitle')}</p>
            <p className="text-xs text-muted-foreground">{t('notifications.noneBody')}</p>
          </div>
        </div>
      )
    }

    return (
      <div className="max-h-80 w-[320px] space-y-1 overflow-y-auto p-1">
        {assignments.map((wo) => (
          <DropdownMenuItem key={wo.id} asChild className={`flex flex-col gap-1 ${document.dir === 'rtl' ? 'items-end' : 'items-start'}`}>
            <Link to={`/work-orders/${wo.id}`} className="flex w-full flex-col gap-1">
              <div className={`flex items-center justify-between gap-2 ${document.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <span className={`text-sm font-medium leading-none truncate ${document.dir === 'rtl' ? 'text-right' : ''}`}>{wo.title}</span>
                <StatusBadge status={wo.status} className="text-[10px] px-2 py-0" />
              </div>
              <div className={`flex items-center justify-between text-xs text-muted-foreground ${document.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <span className="truncate">{wo.machine?.name || t('status.noMachine')}</span>
                <span>{formatDate(wo.createdAt)}</span>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
      </div>
    )
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (nextOpen) {
      setSeenIds((prev) => {
        const next = new Set(prev)
        assignments.forEach((wo) => next.add(wo.id))
        persistSeenToStorage(userId, next)
        return next
      })
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
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
        <DropdownMenuLabel className={`flex flex-col gap-1 ${document.dir === 'rtl' ? 'items-end' : ''}`}>
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
