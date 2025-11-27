import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, User, Calendar, AlertCircle, Loader2, CheckCircle2, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api } from '@/lib/api'
import { format } from 'date-fns'

interface WorkOrder {
  id: string
  title: string
  descriptionRaw: string | null
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'CLOSED'
  type: string
  priority: string
  reportedAt: string | null
  createdAt: string
  startedAt: string | null
  completedAt: string | null
  machine: {
    id: string
    name: string
  } | null
  reportedBy: {
    id: string
    name: string
  } | null
  assignedTo: {
    id: string
    name: string
  } | null
}

const statusOptions = [
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'WAITING', label: 'Waiting' },
  { value: 'CLOSED', label: 'Closed' },
]

export default function WorkOrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    const fetchWorkOrder = async () => {
      if (!id) return

      try {
        setLoading(true)
        const { data } = await api.get(`/work-orders/${id}`)
        setWorkOrder(data.data)
        setError(null)
      } catch (err: unknown) {
        const error = err as { response?: { data?: { error?: { message?: string } } } }
        setError(error?.response?.data?.error?.message || 'Failed to load work order')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkOrder()
  }, [id])

  const handleStatusChange = async (newStatus: string) => {
    if (!id || !workOrder) return

    setUpdatingStatus(true)
    try {
      const { data } = await api.patch(`/work-orders/${id}/status`, {
        status: newStatus,
      })
      setWorkOrder(data.data)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: { message?: string } } } }
      setError(error?.response?.data?.error?.message || 'Failed to update status')
    } finally {
      setUpdatingStatus(false)
    }
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A'
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm')
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !workOrder) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Button>
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
          <ClipboardList className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">{error || 'Work order not found'}</p>
          <Button asChild>
            <Link to="/work-orders">Back to Work Orders</Link>
          </Button>
        </div>
      </div>
    )
  }

  const currentStatusLabel = statusOptions.find(opt => opt.value === workOrder.status)?.label || workOrder.status

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold tracking-tight">{workOrder.id.slice(0, 8)}...</h2>
            <StatusBadge status={workOrder.status} />
          </div>
          <h3 className="text-xl font-medium text-muted-foreground">{workOrder.title}</h3>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={updatingStatus}>
                {updatingStatus ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    Change Status: {currentStatusLabel}
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => handleStatusChange(option.value)}
                  disabled={workOrder.status === option.value}
                >
                  {workOrder.status === option.value && (
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                  )}
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{workOrder.descriptionRaw || 'No description provided'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repair Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                No repair actions logged yet.
                <div className="mt-4">
                  <Button variant="secondary">Log Repair</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Priority
                </span>
                <Badge
                  variant={
                    workOrder.priority === 'CRITICAL'
                      ? 'destructive'
                      : workOrder.priority === 'HIGH'
                      ? 'warning'
                      : 'outline'
                  }
                >
                  {workOrder.priority}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4" /> Assignee
                </span>
                <span className="text-sm font-medium">
                  {workOrder.assignedTo?.name || 'Unassigned'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Created
                </span>
                <span className="text-sm font-medium">
                  {formatDate(workOrder.createdAt || workOrder.reportedAt)}
                </span>
              </div>
              {workOrder.completedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Resolved
                  </span>
                  <span className="text-sm font-medium">
                    {formatDate(workOrder.completedAt)}
                  </span>
                </div>
              )}
              {workOrder.startedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Started
                  </span>
                  <span className="text-sm font-medium">
                    {formatDate(workOrder.startedAt)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="text-sm font-medium">{workOrder.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Machine</span>
                <span className="text-sm font-medium">{workOrder.machine?.name || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reported By</span>
                <span className="text-sm font-medium">{workOrder.reportedBy?.name || '-'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
