import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, DollarSign, Edit, Loader2, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'
import { useTranslatedText } from '@/lib/translation'

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
  const { t } = useTranslation(['parts', 'common'])
  const [part, setPart] = useState<Part | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const translatedDescription = useTranslatedText(part?.description ?? '')

  useEffect(() => {
    const fetchPart = async () => {
      if (!id) return

      try {
        const response = await api.get(`/parts/${id}`)
        setPart(response.data.data)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch part:', err)
        setError(t('errors.loadDetail'))
      } finally {
        setLoading(false)
      }
    }

    fetchPart()
  }, [id, t])

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
          <p className="text-muted-foreground">{error || t('errors.notFound')}</p>
          <Button asChild>
            <Link to="/parts">{t('actions.backToParts')}</Link>
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
              <span className="font-mono bg-muted px-1 py-0.5 rounded">
                {part.partNumber || t('detail.partNumberMissing')}
              </span>
              <span>•</span>
              <span>{part.category || t('detail.uncategorized')}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">{t('actions.adjustStock')}</Button>
            <Button asChild>
                <Link to={`/parts/${id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> {t('actions.editPart')}
                </Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Details */}
        <Card>
          <CardHeader>
            <CardTitle>{t('detail.partDetails')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t('detail.manufacturer')}</label>
                <p className="text-sm font-medium">{part.manufacturer || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t('detail.supplier')}</label>
                <p className="text-sm font-medium">{part.supplier || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t('detail.cost')}</label>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {part.unitCost ? Number(part.unitCost).toFixed(2) : '-'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t('detail.location')}</label>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{part.location || '-'}</span>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">{t('detail.description')}</label>
              <p className="text-sm mt-1">
                {translatedDescription || t('detail.noDescription')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Status */}
        <Card>
          <CardHeader>
            <CardTitle>{t('detail.inventoryStatus')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{part.stockQuantity}</div>
                <div className="text-sm text-muted-foreground">{t('detail.currentStock')}</div>
              </div>
              <div className="h-12 w-px bg-border mx-4"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-muted-foreground">{part.minStock}</div>
                <div className="text-sm text-muted-foreground">{t('detail.minLevel')}</div>
              </div>
              <div className="h-12 w-px bg-border mx-4"></div>
               <div className="text-center">
                 <Badge variant={part.stockQuantity <= part.minStock ? "destructive" : "secondary"} className="text-sm">
                    {part.stockQuantity <= part.minStock ? t('detail.lowStock') : t('detail.inStock')}
                 </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
                <h4 className="text-sm font-medium mb-2">{t('detail.recentActivity')}</h4>
                <div className="border rounded-md p-3 text-sm text-muted-foreground text-center py-6">
                    {t('detail.noActivity')}
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
