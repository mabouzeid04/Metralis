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

const machinesData = [
  { id: '1', name: 'Filler 01', code: 'FIL-01', category: 'Filler', status: 'Running', location: 'Line 1', lastMaintenance: '2023-10-15' },
  { id: '2', name: 'Labeler 02', code: 'LAB-02', category: 'Labeler', status: 'Down', location: 'Line 1', lastMaintenance: '2023-10-20' },
  { id: '3', name: 'Packer 01', code: 'PAC-01', category: 'Packer', status: 'Maintenance', location: 'Line 2', lastMaintenance: '2023-11-01' },
  { id: '4', name: 'Palletizer 03', code: 'PAL-03', category: 'Palletizer', status: 'Running', location: 'Line 2', lastMaintenance: '2023-09-10' },
  { id: '5', name: 'Conveyor Main', code: 'CON-01', category: 'Conveyor', status: 'Running', location: 'Line 1', lastMaintenance: '2023-10-05' },
]

export default function MachinesList() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMachines = machinesData.filter(machine => 
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Machines</h2>
          <p className="text-muted-foreground">Manage your factory assets and equipment.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Machine
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search machines..."
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
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden lg:table-cell">Last Maint.</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell>{machine.code}</TableCell>
                  <TableCell className="hidden md:table-cell">{machine.category}</TableCell>
                  <TableCell className="hidden md:table-cell">{machine.location}</TableCell>
                  <TableCell className="hidden lg:table-cell">{machine.lastMaintenance}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/machines/${machine.id}`}>View</Link>
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

