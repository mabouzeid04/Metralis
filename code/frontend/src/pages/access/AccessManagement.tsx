import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'
import { ShieldCheck, Users, RefreshCw } from 'lucide-react'

type UserStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

interface ManagedUser {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'TECHNICIAN'
  status: UserStatus
  createdAt: string
  approvedAt?: string | null
}

const StatusPill = ({ status }: { status: UserStatus }) => {
  const variants: Record<UserStatus, { label: string; variant: 'outline' | 'secondary' | 'destructive' }> = {
    APPROVED: { label: 'Approved', variant: 'secondary' },
    PENDING: { label: 'Pending', variant: 'outline' },
    REJECTED: { label: 'Rejected', variant: 'destructive' },
  }
  const { label, variant } = variants[status]
  return <Badge variant={variant}>{label}</Badge>
}

const getApiErrorMessage = (err: unknown) =>
  (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message

export default function AccessManagement() {
  const [pendingUsers, setPendingUsers] = useState<ManagedUser[]>([])
  const [allUsers, setAllUsers] = useState<ManagedUser[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [pendingResponse, allResponse] = await Promise.all([
        api.get('/users/pending'),
        api.get('/users'),
      ])
      setPendingUsers(pendingResponse.data.data)
      setAllUsers(allResponse.data.data)
    } catch (err) {
      setError(getApiErrorMessage(err) || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleDecision = useCallback(async (id: string, action: 'approve' | 'reject') => {
    setActionLoading(id + action)
    try {
      await api.patch(`/users/${id}/${action}`)
      await fetchData()
    } catch (err) {
      setError(getApiErrorMessage(err) || 'Action failed')
    } finally {
      setActionLoading(null)
    }
  }, [fetchData])

  const pendingContent = useMemo(() => {
    if (loading) {
      return <p className="text-sm text-muted-foreground">Loading pending requests…</p>
    }

    if (!pendingUsers.length) {
      return <p className="text-sm text-muted-foreground">No technician requests are waiting for approval.</p>
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Requested</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell className="font-mono text-xs">{user.email}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={actionLoading !== null}
                  onClick={() => handleDecision(user.id, 'approve')}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={actionLoading !== null}
                  onClick={() => handleDecision(user.id, 'reject')}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }, [pendingUsers, loading, actionLoading, handleDecision])

  const allUsersContent = useMemo(() => {
    if (loading) {
      return <p className="text-sm text-muted-foreground">Loading users…</p>
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Approved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell className="font-mono text-xs">{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === 'ADMIN' ? 'secondary' : 'outline'}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <StatusPill status={user.status} />
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {user.approvedAt ? new Date(user.approvedAt).toLocaleDateString() : '—'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }, [allUsers, loading])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Access Management
          </h2>
          <p className="text-muted-foreground">
            Approve technician requests and audit every account in your workspace.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Pending Technician Requests
          </CardTitle>
          <CardDescription>Technicians stay here until an admin approves or rejects them.</CardDescription>
        </CardHeader>
        <CardContent>{pendingContent}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Includes admins plus every technician regardless of status.</CardDescription>
        </CardHeader>
        <CardContent>{allUsersContent}</CardContent>
      </Card>
    </div>
  )
}


