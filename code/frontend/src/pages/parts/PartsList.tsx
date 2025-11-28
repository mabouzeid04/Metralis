import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter, Package, Loader2 } from 'lucide-react'
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
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

interface Part {
  id: string
  name: string
  partNumber: string | null
  category: string | null
  stockQuantity: number
  minStock: number
  manufacturer: string | null
  location: string | null
  unitCost: number | null
}

export default function PartsList() {
  const [parts, setParts] = useState<Part[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { isApproved } = useAuth()

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await api.get('/parts')
        setParts(response.data.data || [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch parts:', err)
        setError('Failed to load parts')
      } finally {
        setLoading(false)
      }
    }

    fetchParts()
  }, [])

  const filteredParts = parts.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (part.partNumber && part.partNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (part.category && part.category.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <Package className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Parts Inventory</h2>
          <p className="text-muted-foreground">Manage spare parts and stock levels.</p>
        </div>
        {isApproved ? (
          <Button className="w-full sm:w-auto" asChild>
            <Link to="/parts/new">
              <Plus className="mr-2 h-4 w-4" /> Add Part
            </Link>
          </Button>
        ) : (
          <Button className="w-full sm:w-auto" variant="outline" disabled title="Awaiting approval">
            <Plus className="mr-2 h-4 w-4" /> Add Part
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search parts..."
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
          {filteredParts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No parts found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try a different search term' : 'Get started by adding your first part'}
              </p>
              {!searchTerm &&
                (isApproved ? (
                  <Button asChild>
                    <Link to="/parts/new">
                      <Plus className="mr-2 h-4 w-4" /> Add Part
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" disabled title="Awaiting approval">
                    <Plus className="mr-2 h-4 w-4" /> Add Part
                  </Button>
                ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Name</TableHead>
                  <TableHead>Part Number</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="hidden lg:table-cell">Location</TableHead>
                  <TableHead className="hidden md:table-cell">Cost</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <Link to={`/parts/${part.id}`} className="hover:underline">
                          {part.name}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{part.partNumber || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">{part.category || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={part.stockQuantity <= part.minStock ? 'text-destructive font-bold' : ''}>
                          {part.stockQuantity}
                        </span>
                        {part.stockQuantity <= part.minStock && (
                          <Badge variant="destructive" className="text-[10px] h-5 px-1">
                            Low
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{part.location || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {part.unitCost ? `$${Number(part.unitCost).toFixed(2)}` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/parts/${part.id}`}>View</Link>
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
