import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter } from 'lucide-react'
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

const workOrdersData = [
  { id: 'WO-1001', title: 'Vibration on gearbox', machine: 'Filler 01', priority: 'High', status: 'Open', assignee: 'John Doe', created: '2023-11-24' },
  { id: 'WO-1002', title: 'Weekly Inspection', machine: 'Labeler 02', priority: 'Medium', status: 'In Progress', assignee: 'Jane Smith', created: '2023-11-23' },
  { id: 'WO-1003', title: 'Belt replacement', machine: 'Conveyor Main', priority: 'Low', status: 'Completed', assignee: 'Mike Johnson', created: '2023-11-20' },
  { id: 'WO-1004', title: 'Sensor calibration', machine: 'Packer 01', priority: 'Medium', status: 'Pending', assignee: 'John Doe', created: '2023-11-22' },
  { id: 'WO-1005', title: 'Oil leak', machine: 'Filler 01', priority: 'Critical', status: 'Open', assignee: 'Unassigned', created: '2023-11-24' },
]

export default function WorkOrdersList() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredWOs = workOrdersData.filter(wo => 
    wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wo.machine.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWOs.map((wo) => (
                <TableRow key={wo.id}>
                  <TableCell className="font-mono text-xs font-medium">{wo.id}</TableCell>
                  <TableCell>
                    <StatusBadge status={wo.status} />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link to={`/work-orders/${wo.id}`} className="hover:underline">
                      {wo.title}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{wo.machine}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={
                        wo.priority === 'Critical' ? 'destructive' :
                        wo.priority === 'High' ? 'warning' : 'outline'
                    }>
                        {wo.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{wo.assignee}</TableCell>
                  <TableCell className="hidden lg:table-cell">{wo.created}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/work-orders/${wo.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

