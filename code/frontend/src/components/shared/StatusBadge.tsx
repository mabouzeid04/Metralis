import { useTranslation } from 'react-i18next'
import { Badge } from "@/components/ui/badge"

export type StatusType = 
  | 'running' | 'up' | 'completed' | 'success' | 'closed'
  | 'maintenance' | 'warning' | 'in_progress' | 'pending' | 'waiting'
  | 'down' | 'error' | 'failed' | 'critical' | 'retired' 
  | 'idle' | 'open' | 'draft'

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useTranslation()
  const normalizedStatus = status
    .toLowerCase()
    .replace(/^status\./, '')
    .replace(/\s+/g, '_') as StatusType
  
  let variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" = "secondary"
  
  switch (normalizedStatus) {
    case 'running':
    case 'up':
    case 'completed':
    case 'success':
    case 'closed':
      variant = "success"
      break
    case 'maintenance':
    case 'warning':
    case 'in_progress':
    case 'pending':
    case 'waiting':
      variant = "warning"
      break
    case 'down':
    case 'error':
    case 'failed':
    case 'critical':
    case 'retired':
      variant = "destructive"
      break
    case 'open':
      variant = "default"
      break
    case 'idle':
    case 'draft':
    default:
      variant = "secondary"
      break
  }

  return (
    <Badge variant={variant} className={className}>
      {t(`common:status.${normalizedStatus}`, { defaultValue: status.replace('_', ' ') })}
    </Badge>
  )
}

