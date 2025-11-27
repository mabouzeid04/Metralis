import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, DollarSign, Edit, Loader2, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'

interface Part {
  id: string
  name: string
  partNumber: string | null
  category: string | null
  description: string | null
  stockQuantity: number
  minStock: number
  manufacturer: string | null
  location: string | null
  unitCost: number | null
  supplier: string | null
  createdAt: string
  updatedAt: string
}

export default function PartDetail() {
  const { id } = useParams()
  const [part, setPart] = useState<Part | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPart = async () => {
      if (!id) return

      try {
        const response = await api.get(`/parts/${id}`)
        setPart(response.data.data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch part:', err)
        setError('Failed to load part details')
      } finally {
        setLoading(false)
      }
    }

    fetchPart()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !part) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/parts">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
          <Package className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">{error || 'Part not found'}</p>
          <Button asChild>
            <Link to="/parts">Back to Parts</Link>
          </Button>
        </div>
      </div>
    )
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
              <span className="font-mono bg-muted px-1 py-0.5 rounded">{part.partNumber || 'No part #'}</span>
              <span>•</span>
              <span>{part.category || 'Uncategorized'}</span>
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
                <p className="text-sm font-medium">{part.manufacturer || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Supplier</label>
                <p className="text-sm font-medium">{part.supplier || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Cost</label>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {part.unitCost ? Number(part.unitCost).toFixed(2) : '-'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{part.location || '-'}</span>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <p className="text-sm mt-1">{part.description || 'No description'}</p>
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
                <div className="text-3xl font-bold">{part.stockQuantity}</div>
                <div className="text-sm text-muted-foreground">Current Stock</div>
              </div>
              <div className="h-12 w-px bg-border mx-4"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-muted-foreground">{part.minStock}</div>
                <div className="text-sm text-muted-foreground">Min Level</div>
              </div>
              <div className="h-12 w-px bg-border mx-4"></div>
               <div className="text-center">
                 <Badge variant={part.stockQuantity <= part.minStock ? "destructive" : "secondary"} className="text-sm">
                    {part.stockQuantity <= part.minStock ? "Low Stock" : "In Stock"}
                 </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                <div className="border rounded-md p-3 text-sm text-muted-foreground text-center py-6">
                    No recent activity
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
