import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Calendar, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Badge } from '@/components/ui/badge'

export default function WorkOrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('Open')

  // Mock Data
  const workOrder = {
    id: id || 'WO-1001',
    title: 'Vibration on gearbox',
    machine: 'Filler 01',
    priority: 'High',
    status: status,
    assignee: 'John Doe',
    created: '2023-11-24',
    description: 'Operator reported loud grinding noise coming from the main gearbox during high speed operation. Vibration levels are above normal.',
    type: 'Corrective'
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
  }

  return (
    <div className="space-y-6">
       <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:bg-transparent">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
            <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold tracking-tight">{workOrder.id}</h2>
                <StatusBadge status={workOrder.status} />
            </div>
            <h3 className="text-xl font-medium text-muted-foreground">{workOrder.title}</h3>
        </div>
        <div className="flex gap-2">
            {status === 'Open' && (
                <Button onClick={() => handleStatusChange('In Progress')}>Start Work</Button>
            )}
            {status === 'In Progress' && (
                <Button onClick={() => handleStatusChange('Completed')} className="bg-green-600 hover:bg-green-700">Complete</Button>
            )}
            {status === 'Completed' && (
                <Button variant="outline" disabled>Closed</Button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap">{workOrder.description}</p>
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
                        <Badge variant={workOrder.priority === 'High' ? 'destructive' : 'outline'}>
                            {workOrder.priority}
                        </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <User className="w-4 h-4" /> Assignee
                        </span>
                        <span className="text-sm font-medium">{workOrder.assignee}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Created
                        </span>
                        <span className="text-sm font-medium">{workOrder.created}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

