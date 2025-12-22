import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, DollarSign, Edit, Loader2, Package, History, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'
import { useTranslatedText } from '@/lib/translation'
import { format } from 'date-fns'

interface Part {
  id: string
  name: string
  partNumber: string | null
  category: string | null
  description: string | null
  stockQty: number
  minStock: number
  manufacturer: string | null
  location: string | null
  cost: number | null
    updatedAt: string
    workOrders: {
    quantity: number
    createdAt: string
    workOrder: {
      id: string
      publicId: string
      title: string
      machine: {
        id: string
        name: string
      }
    }
  }[]
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
            <Button asChild>
                <Link to={`/parts/${id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> {t('actions.editPart')}
                </Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6 border-b mb-6">
            <CardTitle className="text-lg font-semibold">{t('detail.partDetails')}</CardTitle>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold tabular-nums leading-none">{part.stockQty}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold mt-1">{t('detail.currentStock')}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold tabular-nums leading-none text-muted-foreground/60">{part.minStock}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold mt-1">{t('detail.minLevel')}</div>
              </div>
              <Badge variant={part.stockQty <= part.minStock ? "destructive" : "outline"} className="h-7 px-3">
                {part.stockQty <= part.minStock ? t('detail.lowStock') : t('detail.inStock')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('detail.manufacturer')}</label>
                <p className="text-sm font-medium mt-1">{part.manufacturer || '-'}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('detail.cost')}</label>
                <div className="flex items-center gap-1 mt-1">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {part.cost ? Number(part.cost).toFixed(2) : '-'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('detail.location')}</label>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-sm font-medium">{part.location || '-'}</span>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t('detail.description')}</label>
              <p className="text-sm mt-2 text-muted-foreground leading-relaxed max-w-3xl">
                {translatedDescription || t('detail.noDescription')}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <History className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t('detail.recentActivity')}
            </h3>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <Settings className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Stock record modified</p>
                      <p className="text-xs text-muted-foreground">Manual adjustment or record update</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{format(new Date(part.updatedAt), 'MMM d, yyyy')}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{format(new Date(part.updatedAt), 'HH:mm')}</p>
                  </div>
                </div>

                {part.workOrders.map((usage, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                        <Package className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            Used {usage.quantity} {usage.quantity === 1 ? 'unit' : 'units'}
                          </span>
                          <Link 
                            to={`/work-orders/${usage.workOrder.publicId}`}
                            className="text-xs text-primary hover:underline font-mono"
                          >
                            #{usage.workOrder.publicId}
                          </Link>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          For <span className="font-medium text-foreground">{usage.workOrder.machine.name}</span> — {usage.workOrder.title}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">{format(new Date(usage.createdAt), 'MMM d, yyyy')}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{format(new Date(usage.createdAt), 'HH:mm')}</p>
                    </div>
                  </div>
                ))}

                {part.workOrders.length === 0 && (
                  <div className="p-6 text-center text-xs text-muted-foreground/60 italic border-t border-dashed">
                    No work order usage recorded yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
