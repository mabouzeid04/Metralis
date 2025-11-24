import { useParams } from 'react-router-dom'
import { Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Timeline } from '@/components/shared/Timeline'
import { Badge } from '@/components/ui/badge'

export default function MachineDetail() {
  const { id } = useParams()
  
  // Mock Data
  const machine = {
    id: id || '1',
    name: 'Filler 01',
    code: 'FIL-01',
    category: 'Filler',
    status: 'Running',
    location: 'Line 1',
    manufacturer: 'Krones',
    model: 'Variopac Pro',
    serial: 'SN-2023-9982',
    installed: '2021-05-15'
  }

  const historyItems = [
    {
      id: '1',
      date: '2023-11-24 09:30',
      title: 'Preventive Maintenance',
      description: 'Routine lubrication and belt inspection completed.',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
    },
    {
      id: '2',
      date: '2023-11-20 14:15',
      title: 'Unexpected Downtime',
      description: 'Sensor failure on infeed starwheel. Replaced sensor #42.',
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />
    },
    {
      id: '3',
      date: '2023-11-10 08:00',
      title: 'Work Order Created',
      description: 'Technician reported unusual vibration.',
      icon: <Wrench className="h-5 w-5 text-blue-500" />
    }
  ]

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
                <span>{machine.code}</span> • <span>{machine.category}</span> • <span>{machine.location}</span>
            </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">View Docs</Button>
          <Button>Create Work Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Machine Info */}
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Machine Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Manufacturer</span>
              <span className="font-medium text-right">{machine.manufacturer}</span>
              
              <span className="text-muted-foreground">Model</span>
              <span className="font-medium text-right">{machine.model}</span>
              
              <span className="text-muted-foreground">Serial #</span>
              <span className="font-medium text-right">{machine.serial}</span>
              
              <span className="text-muted-foreground">Installed</span>
              <span className="font-medium text-right">{machine.installed}</span>
            </div>
            
            <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Recent Metrics</h4>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Uptime (7d)</span>
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">98.5%</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">MTBF</span>
                        <span>142h</span>
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
            <Timeline items={historyItems} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

