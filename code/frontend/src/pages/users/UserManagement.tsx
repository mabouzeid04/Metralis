import { useCallback, useEffect, useMemo, useState } from 'react'
import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Loader2, RefreshCw, ShieldCheck, Trash2, Users as UsersIcon } from 'lucide-react'

type UserStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

interface UserRecord {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'TECHNICIAN'
  active?: boolean
  createdAt?: string
  status?: UserStatus
  approvedAt?: string | null
}

const roleOptions: UserRecord['role'][] = ['ADMIN', 'TECHNICIAN']

const StatusPill = ({ status, t }: { status: UserStatus; t: TFunction }) => {
  const variants: Record<UserStatus, { label: string; variant: 'outline' | 'secondary' | 'destructive' }> = {
    APPROVED: { label: t('users:status.approved'), variant: 'secondary' },
    PENDING: { label: t('users:status.pending'), variant: 'outline' },
    REJECTED: { label: t('users:status.rejected'), variant: 'destructive' },
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
  const { t } = useTranslation(['users', 'common'])
  const { user: currentUser } = useAuth()

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/users')
      setUsers(data.data)
      setError(null)
    } catch (err) {
      setError(getApiErrorMessage(err) || t('errors.load'))
    } finally {
      setLoading(false)
    }
  }, [t])

  const fetchPendingUsers = useCallback(async () => {
    setPendingLoading(true)
    setPendingError(null)
    try {
      const { data } = await api.get('/users/pending')
      setPendingUsers(data.data)
    } catch (err) {
      setPendingError(getApiErrorMessage(err) || t('errors.loadPending'))
    } finally {
      setPendingLoading(false)
    }
  }, [t])

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
        setPendingError(getApiErrorMessage(err) || t('errors.action'))
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

  const handleDeleteUser = useCallback(
    async (user: UserRecord) => {
      if (currentUser?.id === user.id) {
        setError(t('errors.deleteSelf'))
        return
      }

      const confirmed = window.confirm(t('confirmDelete', { name: user.name }))
      if (!confirmed) return

      setActionLoading(`${user.id}-delete`)
      try {
        await api.delete(`/users/${user.id}`)
        await fetchUsers()
        setError(null)
      } catch (err) {
        setError(getApiErrorMessage(err) || t('errors.delete'))
      } finally {
        setActionLoading(null)
      }
    },
    [currentUser?.id, fetchUsers, t],
  )

  const pendingContent = useMemo(() => {
    if (pendingLoading) {
      return <p className="text-sm text-muted-foreground">{t('pendingLoading')}</p>
    }

    if (!pendingUsers.length) {
      return <p className="text-sm text-muted-foreground">{t('pendingEmpty')}</p>
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('table.name')}</TableHead>
            <TableHead>{t('table.email')}</TableHead>
            <TableHead>{t('table.created')}</TableHead>
            <TableHead className="text-right">{t('table.actions')}</TableHead>
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
                  {t('approve')}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={actionLoading !== null}
                  onClick={() => handleDecision(user.id, 'reject')}
                >
                  {t('reject')}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }, [pendingUsers, pendingLoading, actionLoading, handleDecision, t])

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
      setFormError(getApiErrorMessage(err) || t('errors.create'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            {t('title')}
            <ShieldCheck className="h-5 w-5 text-primary" />
          </h2>
          <p className="text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-primary" />
              {t('pendingTitle')}
            </CardTitle>
            <CardDescription>{t('pendingDescription')}</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading || pendingLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('refresh')}
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
            <CardTitle>{t('table.teamMembers')}</CardTitle>
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
                    <TableHead>{t('table.name')}</TableHead>
                    <TableHead>{t('table.email')}</TableHead>
                    <TableHead>{t('table.role')}</TableHead>
                    <TableHead className="hidden md:table-cell">{t('table.status')}</TableHead>
                    <TableHead className="hidden md:table-cell">{t('table.created')}</TableHead>
                    <TableHead className="text-right">{t('table.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'ADMIN' ? 'secondary' : 'outline'} className="uppercase">
                          {t(`common:roles.${user.role.toLowerCase()}`, { defaultValue: user.role })}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {user.status ? <StatusPill status={user.status} t={t} /> : '—'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          disabled={actionLoading !== null}
                          onClick={() => handleDeleteUser(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">{t('deleteUser', { name: user.name })}</span>
                        </Button>
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
            <CardTitle>{t('form.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleCreateUser}>
              <div className="space-y-2">
                <Label htmlFor="name">{t('form.name')}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t('form.name')}
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('form.email')}</Label>
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
                <Label htmlFor="role">{t('form.role')}</Label>
                <select
                  id="role"
                  name="role"
                  value={formState.role}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {t(`common:roles.${role.toLowerCase()}`, { defaultValue: role })}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('form.password')}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t('form.passwordHint')}
                  value={formState.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {formError && <p className="text-sm text-destructive">{formError}</p>}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('form.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


