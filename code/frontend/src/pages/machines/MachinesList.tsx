import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Plus, Search, Filter, Loader2, ServerOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useMachines } from '@/lib/hooks/useDashboard'
import { useAuth } from '@/contexts/AuthContext'

export default function MachinesList() {
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'
  const { t } = useTranslation(['machines', 'common'])

  // React Query - data cached for 5 minutes, instant on back navigation
  const { data: machines = [], isLoading: loading, error } = useMachines()

  const filteredMachines = useMemo(() =>
    machines.filter(machine =>
      machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (machine.code && machine.code.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    [machines, searchTerm]
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <ServerOff className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">{error.message || t('errors.load')}</p>
        <Button onClick={() => window.location.reload()}>{t('common:actions.retry')}</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </div>
        {isAdmin ? (
          <Button className="w-full sm:w-auto" asChild>
            <Link to="/machines/new">
              <Plus className="mr-2 h-4 w-4" /> {t('add')}
            </Link>
          </Button>
        ) : (
          <Button className="w-full sm:w-auto" variant="outline" disabled title={t('adminsOnly')}>
            <Plus className="mr-2 h-4 w-4" /> {t('add')}
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredMachines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ServerOff className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">{t('emptyTitle')}</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? t('emptySearchHint') : t('emptyCreateHint')}
              </p>
              {!searchTerm && (
                isAdmin ? (
                  <Button asChild>
                    <Link to="/machines/new">
                      <Plus className="mr-2 h-4 w-4" /> {t('add')}
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" disabled title={t('adminsOnly')}>
                    <Plus className="mr-2 h-4 w-4" /> {t('add')}
                  </Button>
                )
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('table.status')}</TableHead>
                  <TableHead>{t('table.name')}</TableHead>
                  <TableHead>{t('table.code')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('table.category')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('table.location')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('table.updated')}</TableHead>
                  <TableHead className="text-right">{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMachines.map((machine) => (
                  <TableRow key={machine.id}>
                    <TableCell>
                      <StatusBadge status={machine.status} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link to={`/machines/${machine.id}`} className="hover:underline">
                        {machine.name}
                      </Link>
                    </TableCell>
                    <TableCell>{machine.code || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">{machine.category || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">{machine.area || machine.line || '-'}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(machine.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/machines/${machine.id}`}>{t('view')}</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
