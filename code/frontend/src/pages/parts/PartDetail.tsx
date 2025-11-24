import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, DollarSign, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PartDetail() {
  const { id } = useParams()

  // Mock Data - In a real app, fetch based on ID
  const part = {
    id: id || '1',
    name: 'Bearing 6204-2RS',
    part_number: 'BRG-6204',
    category: 'Bearings',
    description: 'Deep groove ball bearing, sealed on both sides. Standard clearance.',
    stock_qty: 12,
    min_stock: 5,
    manufacturer: 'SKF',
    location: 'Shelf A-12',
    cost: 15.50,
    supplier: 'Industrial Supply Co.',
    last_ordered: '2023-10-10'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/parts">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {part.name}
            </h2>
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <span className="font-mono bg-muted px-1 py-0.5 rounded">{part.part_number}</span>
              <span>•</span>
              <span>{part.category}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">Adjust Stock</Button>
            <Button>
                <Edit className="mr-2 h-4 w-4" /> Edit Part
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Details */}
        <Card>
          <CardHeader>
            <CardTitle>Part Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Manufacturer</label>
                <p className="text-sm font-medium">{part.manufacturer}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Supplier</label>
                <p className="text-sm font-medium">{part.supplier}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Cost</label>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{part.cost.toFixed(2)}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{part.location}</span>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-sm mt-1">{part.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{part.stock_qty}</div>
                <div className="text-sm text-muted-foreground">Current Stock</div>
              </div>
              <div className="h-12 w-px bg-border mx-4"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-muted-foreground">{part.min_stock}</div>
                <div className="text-sm text-muted-foreground">Min Level</div>
              </div>
              <div className="h-12 w-px bg-border mx-4"></div>
               <div className="text-center">
                 <Badge variant={part.stock_qty <= part.min_stock ? "destructive" : "secondary"} className="text-sm">
                    {part.stock_qty <= part.min_stock ? "Low Stock" : "In Stock"}
                 </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-sm font-medium mb-2">Recent Usage</h4>
                <div className="border rounded-md p-3 text-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">2023-11-10</span>
                        <span>Used 2 in WO-1001</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-muted-foreground">2023-10-15</span>
                        <span>Restocked +10</span>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

