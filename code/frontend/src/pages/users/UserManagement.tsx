import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Loader2, RefreshCw, ShieldCheck, Users as UsersIcon } from 'lucide-react'

type UserStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

interface UserRecord {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'TECHNICIAN'
  createdAt?: string
  status?: UserStatus
  approvedAt?: string | null
}

const roleOptions: UserRecord['role'][] = ['ADMIN', 'TECHNICIAN']

const StatusPill = ({ status }: { status: UserStatus }) => {
  const variants: Record<UserStatus, { label: string; variant: 'outline' | 'secondary' | 'destructive' }> = {
    APPROVED: { label: 'Approved', variant: 'secondary' },
    PENDING: { label: 'Pending', variant: 'outline' },
    REJECTED: { label: 'Rejected', variant: 'destructive' },
  }
  const { label, variant } = variants[status]
  return <Badge variant={variant}>{label}</Badge>
}

const initialFormState = {
  name: '',
  email: '',
  role: 'TECHNICIAN' as UserRecord['role'],
  password: '',
}

const getApiErrorMessage = (err: unknown) =>
  (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message

export default function UserManagement() {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pendingUsers, setPendingUsers] = useState<UserRecord[]>([])
  const [pendingLoading, setPendingLoading] = useState(true)
  const [pendingError, setPendingError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [formState, setFormState] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/users')
      setUsers(data.data)
      setError(null)
    } catch (err) {
      setError(getApiErrorMessage(err) || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchPendingUsers = useCallback(async () => {
    setPendingLoading(true)
    setPendingError(null)
    try {
      const { data } = await api.get('/users/pending')
      setPendingUsers(data.data)
    } catch (err) {
      setPendingError(getApiErrorMessage(err) || 'Failed to load pending users')
    } finally {
      setPendingLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
    fetchPendingUsers()
  }, [fetchUsers, fetchPendingUsers])

  const handleDecision = useCallback(
    async (id: string, action: 'approve' | 'reject') => {
      setActionLoading(id + action)
      try {
        await api.patch(`/users/${id}/${action}`)
        await Promise.all([fetchUsers(), fetchPendingUsers()])
      } catch (err) {
        setPendingError(getApiErrorMessage(err) || 'Action failed')
      } finally {
        setActionLoading(null)
      }
    },
    [fetchUsers, fetchPendingUsers],
  )

  const handleRefresh = () => {
    fetchUsers()
    fetchPendingUsers()
  }

  const pendingContent = useMemo(() => {
    if (pendingLoading) {
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
              <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</TableCell>
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
  }, [pendingUsers, pendingLoading, actionLoading, handleDecision])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    try {
      await api.post('/users', formState)
      setFormState(initialFormState)
      await fetchUsers()
    } catch (err) {
      setFormError(getApiErrorMessage(err) || 'Failed to create user')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            User Management
            <ShieldCheck className="h-5 w-5 text-primary" />
          </h2>
          <p className="text-muted-foreground">
            Create accounts and manage access levels for your maintenance team.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-primary" />
              Pending Technician Requests
            </CardTitle>
            <CardDescription>Technicians stay here until an admin approves or rejects them.</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading || pendingLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>
        {pendingError && (
          <div className="mx-6 mb-4 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {pendingError}
          </div>
        )}
        <CardContent>{pendingContent}</CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="p-6 text-sm text-destructive">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'ADMIN' ? 'secondary' : 'outline'} className="uppercase">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {user.status ? <StatusPill status={user.status} /> : '—'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleCreateUser}>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jane Doe"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  value={formState.role}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Temporary Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={formState.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {formError && <p className="text-sm text-destructive">{formError}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create User
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


