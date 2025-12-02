import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Wrench, AlertTriangle, CheckCircle2, Loader2, ServerOff } from 'lucide-react'
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
  const navigate = useNavigate()
  const [machine, setMachine] = useState<Machine | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'

  useEffect(() => {
    const fetchMachine = async () => {
      if (!id) return

      try {
        const response = await api.get(`/machines/${id}`)
        setMachine(response.data.data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch machine:', err)
        setError('Failed to load machine details')
      } finally {
        setLoading(false)
      }
    }

    fetchMachine()
  }, [id])

  const handleDelete = async () => {
    if (!machine || deleting) return

    const confirmed = window.confirm('Delete this machine? This cannot be undone.')
    if (!confirmed) return

    setDeleting(true)
    setDeleteError(null)
    try {
      await api.delete(`/machines/${machine.id}`)
      navigate('/machines')
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { error?: { message?: string } } } }
      setDeleteError(apiError?.response?.data?.error?.message || 'Failed to delete machine')
    } finally {
      setDeleting(false)
    }
  }

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
        <p className="text-muted-foreground">{error || 'Machine not found'}</p>
        <Button asChild>
          <Link to="/machines">Back to Machines</Link>
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

      const items: Array<{ id: string; date: string; description: string; title: string; icon: JSX.Element; timestamp: number }> = [
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
        <div>
            <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-bold tracking-tight">{machine.name}</h2>
                <StatusBadge status={machine.status} />
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
                <span>{machine.code || 'No code'}</span> • <span>{machine.category || 'Uncategorized'}</span> • <span>{machine.area || machine.line || 'No location'}</span>
            </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link to={`/documents?machine=${machine.id}`}>View Docs</Link>
          </Button>
          <Button asChild>
            <Link to={`/work-orders/new?machine=${machine.id}`}>Create Work Order</Link>
          </Button>
          {isAdmin && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete Machine
            </Button>
          )}
        </div>
      </div>

      {deleteError && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
          {deleteError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Machine Info */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Machine Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Manufacturer</span>
              <span className="font-medium text-right">{machine.manufacturer || '-'}</span>
              
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium text-right">{machine.model || '-'}</span>
              
              <span className="text-muted-foreground">Serial #</span>
              <span className="font-medium text-right">{machine.serialNumber || '-'}</span>
              
              <span className="text-muted-foreground">Commissioned</span>
              <span className="font-medium text-right">
                {machine.commissionedAt ? new Date(machine.commissionedAt).toLocaleDateString() : '-'}
              </span>
            </div>
            
            <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Status</h4>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current Status</span>
                        <Badge variant="outline" className={
                          machine.status === 'RUNNING' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                          machine.status === 'DOWN' ? 'text-red-600 border-red-200 bg-red-50' :
                          machine.status === 'MAINTENANCE' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                          ''
                        }>
                          {machine.status}
                        </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Work Orders</span>
                        <span>{machine.workOrders?.length || 0}</span>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* History Timeline */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">History & Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {historyItems.length > 0 ? (
              <Timeline items={historyItems} />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Wrench className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No work orders yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
