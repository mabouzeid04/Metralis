import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { AlertTriangle, Clock } from 'lucide-react'

export default function AwaitingApproval() {
  const { user } = useAuth()
  const location = useLocation() as { state?: { email?: string } }

  const email = user?.email || location.state?.email
  const status = user?.status ?? 'PENDING'

  const { title, description, icon } = useMemo(() => {
    if (status === 'REJECTED') {
      return {
        title: 'Your account was not approved',
        description:
          'An administrator rejected this technician account. Please contact your Metralis admin if you believe this is an error.',
        icon: <AlertTriangle className="h-10 w-10 text-red-500" />,
      }
    }
    return {
      title: 'Awaiting admin approval',
      description:
        'Thanks for signing up! A Metralis administrator must approve technician accounts before access is granted.',
      icon: <Clock className="h-10 w-10 text-primary" />,
    }
  }, [status])

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
              <p className="text-sm text-muted-foreground">Pending account</p>
              <p className="text-base font-medium">{email}</p>
            </div>
          )}

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>What happens next?</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your request is queued for an admin to review.</li>
              <li>Approved accounts gain access immediately.</li>
              <li>Rejected accounts can be retried after speaking with an admin.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1" variant="secondary">
              <Link to="/login">Back to login</Link>
            </Button>
            <Button asChild className="flex-1" variant="outline">
              <Link to="mailto:support@metralis.com">Contact support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


