import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Wrench, AlertTriangle, CheckCircle2, Loader2, ServerOff, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Timeline } from '@/components/shared/Timeline'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

interface Machine {
  id: string
  name: string
  code: string | null
  category: string | null
  status: string
  area: string | null
  line: string | null
  manufacturer: string | null
  model: string | null
  serialNumber: string | null
  commissionedAt: string | null
  createdAt: string
  updatedAt: string
  workOrders?: Array<{
    id: string
    title: string
    status: string
    type: string
    createdAt: string
    completedAt: string | null
    repairActions?: Array<{
      id: string
      actions: string
      success: boolean
      createdAt: string
    }>
  }>
}

export default function MachineDetail() {
  const { id } = useParams()
  const [machine, setMachine] = useState<Machine | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'
  const { t } = useTranslation(['machines', 'common'])

  useEffect(() => {
    const fetchMachine = async () => {
      if (!id) return

      try {
        const response = await api.get(`/machines/${id}`)
        setMachine(response.data.data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch machine:', err)
        setError(t('errors.notFound'))
      } finally {
        setLoading(false)
      }
    }

    fetchMachine()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !machine) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <ServerOff className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">{error || t('errors.notFound')}</p>
        <Button asChild>
          <Link to="/machines">{t('form.back')}</Link>
        </Button>
      </div>
    )
  }

  // Build history items from work orders + repair logs
  const historyItems = (machine.workOrders || [])
    .flatMap((wo) => {
      const workOrderIcon =
        wo.status === 'CLOSED'
          ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          : wo.type === 'CORRECTIVE'
          ? <AlertTriangle className="h-5 w-5 text-red-500" />
          : <Wrench className="h-5 w-5 text-blue-500" />

      const items = [
        {
          id: wo.id,
          date: new Date(wo.createdAt).toLocaleString(),
          title: wo.title,
          description: `${wo.type} - ${wo.status}`,
          icon: workOrderIcon,
          timestamp: new Date(wo.createdAt).getTime(),
        },
      ]

      if (wo.repairActions?.length) {
        items.push(
          ...wo.repairActions.map((repair) => ({
            id: `${repair.id}-repair`,
            date: new Date(repair.createdAt).toLocaleString(),
            title: repair.actions,
            description: repair.success ? 'Repair completed' : 'Repair logged - needs follow-up',
            icon: repair.success ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            ) : (
              <Wrench className="h-5 w-5 text-blue-500" />
            ),
            timestamp: new Date(repair.createdAt).getTime(),
          })),
        )
      }

      return items
    })
    .sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/machines">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-3xl font-bold tracking-tight">{machine.name}</h2>
                  <StatusBadge status={machine.status} />
                </div>
                <p className="text-muted-foreground flex items-center gap-2">
                    <span>{machine.code || t('detail.noCode')}</span> • <span>{machine.category || t('detail.uncategorized')}</span> • <span>{machine.area || machine.line || t('detail.noLocation')}</span>
                </p>
              </div>
            </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to={`/documents?machine=${machine.id}`}>{t('actions.viewDocs')}</Link>
          </Button>
          <Button asChild>
            <Link to={`/work-orders/new?machine=${machine.id}`}>{t('actions.createWO')}</Link>
          </Button>
          {isAdmin && (
            <Button variant="secondary" asChild>
              <Link to={`/machines/${machine.id}/edit`}>{t('common:actions.edit')}</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Machine Info */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">{t('detail.overviewTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">{t('detail.manufacturer')}</span>
              <span className="font-medium text-right">{machine.manufacturer || t('detail.notAvailable')}</span>
              
              <span className="text-muted-foreground">{t('detail.model')}</span>
              <span className="font-medium text-right">{machine.model || t('detail.notAvailable')}</span>
              
              <span className="text-muted-foreground">{t('detail.serialNumber')}</span>
              <span className="font-medium text-right">{machine.serialNumber || t('detail.notAvailable')}</span>
              
              <span className="text-muted-foreground">{t('detail.commissionedAt')}</span>
              <span className="font-medium text-right">
                {machine.commissionedAt ? new Date(machine.commissionedAt).toLocaleDateString() : t('detail.notAvailable')}
              </span>

              <span className="text-muted-foreground">{t('detail.updatedAt')}</span>
              <span className="font-medium text-right">
                {new Date(machine.updatedAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">{t('detail.status')}</h4>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('detail.status')}</span>
                        <Badge variant="outline" className={
                          machine.status === 'RUNNING' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                          machine.status === 'DOWN' ? 'text-red-600 border-red-200 bg-red-50' :
                          machine.status === 'MAINTENANCE' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                          ''
                        }>
                          {t(`common:status.${machine.status.toLowerCase()}`, { defaultValue: machine.status })}
                        </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('workOrders')}</span>
                        <span>{machine.workOrders?.length || 0}</span>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* History Timeline */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">{t('detail.historyTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            {historyItems.length > 0 ? (
              <Timeline items={historyItems} />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Wrench className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t('detail.noActivity')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
