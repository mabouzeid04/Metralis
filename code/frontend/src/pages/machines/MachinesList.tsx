import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
import { api } from '@/lib/api'

interface Machine {
  id: string
  name: string
  code: string | null
  category: string | null
  status: string
  area: string | null
  line: string | null
  updatedAt: string
}

export default function MachinesList() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await api.get('/machines')
        setMachines(response.data.data || [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch machines:', err)
        setError('Failed to load machines')
      } finally {
        setLoading(false)
      }
    }

    fetchMachines()
  }, [])

  const filteredMachines = machines.filter(machine => 
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (machine.code && machine.code.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

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
          {filteredMachines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ServerOff className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No machines found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try a different search term' : 'Get started by adding your first machine'}
              </p>
              {!searchTerm && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Machine
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
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
                    <TableCell>{machine.code || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">{machine.category || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">{machine.area || machine.line || '-'}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(machine.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/machines/${machine.id}`}>View</Link>
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
