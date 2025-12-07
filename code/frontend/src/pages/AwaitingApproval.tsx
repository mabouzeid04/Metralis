import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { AlertTriangle, Clock } from 'lucide-react'

export default function AwaitingApproval() {
  const { user } = useAuth()
  const location = useLocation() as { state?: { email?: string } }
  const { t } = useTranslation('auth')

  const email = user?.email || location.state?.email
  const status = user?.status ?? 'PENDING'

  const { title, description, icon } = useMemo(() => {
    if (status === 'REJECTED') {
      return {
        title: t('auth:awaiting.rejectedTitle'),
        description: t('auth:awaiting.rejectedDescription'),
        icon: <AlertTriangle className="h-10 w-10 text-red-500" />,
      }
    }
    return {
      title: t('auth:awaiting.pendingTitle'),
      description: t('auth:awaiting.pendingDescription'),
      icon: <Clock className="h-10 w-10 text-primary" />,
    }
  }, [status, t])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">{icon}</div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {email && (
            <div className="rounded-lg border bg-muted/50 px-4 py-3 text-center">
              <p className="text-sm text-muted-foreground">{t('auth:awaiting.pendingAccount')}</p>
              <p className="text-base font-medium">{email}</p>
            </div>
          )}

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>{t('auth:awaiting.next')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('auth:awaiting.steps.queued')}</li>
              <li>{t('auth:awaiting.steps.approved')}</li>
              <li>{t('auth:awaiting.steps.rejected')}</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1" variant="secondary">
              <Link to="/login">{t('auth:awaiting.backToLogin')}</Link>
            </Button>
            <Button asChild className="flex-1" variant="outline">
              <Link to="mailto:support@metralis.com">{t('auth:awaiting.contactSupport')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


