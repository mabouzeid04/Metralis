import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter, Package } from 'lucide-react'
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

// Mock Data
const partsData = [
  { 
    id: '1', 
    name: 'Bearing 6204-2RS', 
    part_number: 'BRG-6204', 
    category: 'Bearings', 
    stock_qty: 12, 
    min_stock: 5, 
    manufacturer: 'SKF', 
    location: 'Shelf A-12', 
    cost: 15.50 
  },
  { 
    id: '2', 
    name: 'O-Ring Kit', 
    part_number: 'ORK-100', 
    category: 'Seals', 
    stock_qty: 3, 
    min_stock: 5, 
    manufacturer: 'Parker', 
    location: 'Drawer B-01', 
    cost: 45.00 
  },
  { 
    id: '3', 
    name: 'Proximity Sensor M12', 
    part_number: 'SENS-PROX-12', 
    category: 'Sensors', 
    stock_qty: 8, 
    min_stock: 2, 
    manufacturer: 'Sick', 
    location: 'Cabinet C-03', 
    cost: 85.20 
  },
  { 
    id: '4', 
    name: 'Conveyor Belt 500mm', 
    part_number: 'BELT-500-PVC', 
    category: 'Belts', 
    stock_qty: 1, 
    min_stock: 1, 
    manufacturer: 'Habasit', 
    location: 'Rack D-01', 
    cost: 250.00 
  },
  { 
    id: '5', 
    name: 'Solenoid Valve 24V', 
    part_number: 'VAL-SOL-24', 
    category: 'Valves', 
    stock_qty: 0, 
    min_stock: 2, 
    manufacturer: 'Festo', 
    location: 'Cabinet C-02', 
    cost: 120.00 
  },
]

export default function PartsList() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredParts = partsData.filter(part => 
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.part_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Parts Inventory</h2>
          <p className="text-muted-foreground">Manage spare parts and stock levels.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Part
        </Button>
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
                  <TableCell className="font-mono text-xs">{part.part_number}</TableCell>
                  <TableCell className="hidden md:table-cell">{part.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={part.stock_qty <= part.min_stock ? 'text-destructive font-bold' : ''}>
                        {part.stock_qty}
                      </span>
                      {part.stock_qty <= part.min_stock && (
                        <Badge variant="destructive" className="text-[10px] h-5 px-1">
                          Low
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{part.location}</TableCell>
                  <TableCell className="hidden md:table-cell">${part.cost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/parts/${part.id}`}>View</Link>
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

