import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
import { useParts } from '@/lib/hooks/useParts'
import { useAuth } from '@/contexts/AuthContext'

export default function PartsList() {
  const [searchTerm, setSearchTerm] = useState('')
  const { isApproved } = useAuth()
  const { t } = useTranslation(['parts', 'common'])

  // React Query - data cached for 5 minutes, instant on back navigation
  const { data: parts = [], isLoading: loading, error } = useParts()

  const filteredParts = useMemo(() =>
    parts.filter(part =>
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (part.partNumber && part.partNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (part.category && part.category.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    [parts, searchTerm]
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
        <p className="text-muted-foreground">{error.message || t('errors.loadList')}</p>
        <Button onClick={() => window.location.reload()}>{t('common:actions.retry')}</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('inventoryTitle')}</h2>
          <p className="text-muted-foreground">{t('inventorySubtitle')}</p>
        </div>
        {isApproved ? (
          <Button className="w-full sm:w-auto" asChild>
            <Link to="/parts/new">
              <Plus className="mr-2 h-4 w-4" /> {t('addPart')}
            </Link>
          </Button>
        ) : (
          <Button className="w-full sm:w-auto" variant="outline" disabled title="Awaiting approval">
            <Plus className="mr-2 h-4 w-4" /> {t('addPart')}
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
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
              <h3 className="text-lg font-semibold">{t('noPartsTitle')}</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? t('noPartsSearch') : t('noPartsEmpty')}
              </p>
              {!searchTerm &&
                (isApproved ? (
                  <Button asChild>
                    <Link to="/parts/new">
                      <Plus className="mr-2 h-4 w-4" /> {t('addPart')}
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" disabled title="Awaiting approval">
                    <Plus className="mr-2 h-4 w-4" /> {t('addPart')}
                  </Button>
                ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('list.table.name')}</TableHead>
                  <TableHead>{t('list.table.partNumber')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('list.table.category')}</TableHead>
                  <TableHead>{t('list.table.stock')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('list.table.location')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('list.table.cost')}</TableHead>
                  <TableHead className="text-right">{t('list.table.actions')}</TableHead>
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
                        <span className={part.stockQty <= part.minStock ? 'text-destructive font-bold' : ''}>
                          {part.stockQty}
                        </span>
                        {part.stockQty <= part.minStock && (
                          <Badge variant="destructive" className="text-[10px] h-5 px-1">
                            {t('list.lowStock')}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{part.location || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {part.cost ? `$${Number(part.cost).toFixed(2)}` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/parts/${part.id}`}>{t('actions.view')}</Link>
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
