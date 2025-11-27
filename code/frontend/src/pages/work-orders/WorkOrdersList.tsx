import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter, Loader2, ClipboardList } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'

interface WorkOrder {
  id: string
  title: string
  status: string
  type: string
  priority: string
  createdAt: string
  completedAt: string | null
  machine: {
    id: string
    name: string
  } | null
  assignedTo: {
    id: string
    name: string
  } | null
}

export default function WorkOrdersList() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await api.get('/work-orders')
        setWorkOrders(response.data.data || [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch work orders:', err)
        setError('Failed to load work orders')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkOrders()
  }, [])

  const filteredWOs = workOrders.filter(wo => 
    wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (wo.machine?.name && wo.machine.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <ClipboardList className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Work Orders</h2>
          <p className="text-muted-foreground">Track maintenance tasks and repairs.</p>
        </div>
        <Button className="w-full sm:w-auto" asChild>
          <Link to="/work-orders/new">
            <Plus className="mr-2 h-4 w-4" /> Create Work Order
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search work orders..."
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
          {filteredWOs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No work orders found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try a different search term' : 'Get started by creating your first work order'}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link to="/work-orders/new">
                    <Plus className="mr-2 h-4 w-4" /> Create Work Order
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Machine</TableHead>
                  <TableHead className="hidden md:table-cell">Priority</TableHead>
                  <TableHead className="hidden lg:table-cell">Assignee</TableHead>
                  <TableHead className="hidden lg:table-cell">Created</TableHead>
                  <TableHead className="hidden xl:table-cell">Resolved</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWOs.map((wo) => (
                  <TableRow key={wo.id}>
                    <TableCell className="font-mono text-xs font-medium">
                      {wo.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={wo.status} />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link to={`/work-orders/${wo.id}`} className="hover:underline">
                        {wo.title}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{wo.machine?.name || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={
                          wo.priority === 'CRITICAL' ? 'destructive' :
                          wo.priority === 'HIGH' ? 'warning' : 'outline'
                      }>
                          {wo.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{wo.assignedTo?.name || 'Unassigned'}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(wo.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {wo.completedAt ? new Date(wo.completedAt).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/work-orders/${wo.id}`}>View</Link>
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
