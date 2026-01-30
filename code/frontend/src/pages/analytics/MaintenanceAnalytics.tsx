import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts'
import {
    ClipboardList,
    FolderOpen,
    Clock,
    TimerOff,
    Repeat,
    ArrowUp,
    ArrowDown,
    Download,
    Loader2,
    ArrowUpDown,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useRootAssets } from '@/lib/hooks/useAssets'
import { useFactoryConfig } from '@/lib/hooks/useFactoryConfig'
import {
    useAnalyticsSummary,
    useAnalyticsByStatus,
    useAnalyticsByType,
    useAnalyticsByAsset,
    useAnalyticsTrend,
    downloadAnalyticsExport,
    type AnalyticsFilters,
} from '@/lib/hooks/useAnalytics'

// ── Helpers ────────────────────────────────────────────────────────────────

function getDateRange(preset: string): { from: string; to: string } {
    const now = new Date()
    const to = now.toISOString().split('T')[0]
    let fromDate: Date

    switch (preset) {
        case '7d':
            fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            break
        case '30d':
            fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            break
        case '90d':
            fromDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
            break
        case '12m':
            fromDate = new Date(now)
            fromDate.setFullYear(fromDate.getFullYear() - 1)
            break
        case 'ytd':
            fromDate = new Date(now.getFullYear(), 0, 1)
            break
        default:
            fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    return { from: fromDate.toISOString().split('T')[0], to }
}

function getGranularity(preset: string): 'day' | 'week' | 'month' {
    switch (preset) {
        case '7d': return 'day'
        case '30d': return 'day'
        case '90d': return 'week'
        case '12m': return 'month'
        case 'ytd': return 'month'
        default: return 'day'
    }
}

const STATUS_COLORS: Record<string, string> = {
    OPEN: '#3b82f6',
    IN_PROGRESS: '#f59e0b',
    WAITING: '#8b5cf6',
    CLOSED: '#22c55e',
}

const PIE_COLORS = ['#3b82f6', '#f59e0b', '#22c55e', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6']

// ── Main Component ─────────────────────────────────────────────────────────

export default function MaintenanceAnalytics() {
    const { t } = useTranslation('analytics')

    // Filter state
    const [datePreset, setDatePreset] = useState('30d')
    const [selectedAssetId, setSelectedAssetId] = useState<string>('')
    const [includeChildren, setIncludeChildren] = useState(true)
    const [selectedMaintenanceType, setSelectedMaintenanceType] = useState<string>('')
    const [assetSortField, setAssetSortField] = useState<'count' | 'downtime' | 'mttr'>('count')
    const [exportingFormat, setExportingFormat] = useState<string | null>(null)

    // Date range from preset
    const { from, to } = useMemo(() => getDateRange(datePreset), [datePreset])
    const granularity = useMemo(() => getGranularity(datePreset), [datePreset])

    // Build filters
    const filters: AnalyticsFilters = useMemo(() => ({
        from,
        to,
        assetId: selectedAssetId || undefined,
        includeChildren,
        maintenanceType: selectedMaintenanceType || undefined,
    }), [from, to, selectedAssetId, includeChildren, selectedMaintenanceType])

    // Data hooks
    const { data: rootAssetsRes } = useRootAssets()
    const { data: factoryConfigRes } = useFactoryConfig()
    const { data: summary, isLoading: summaryLoading } = useAnalyticsSummary(filters)
    const { data: statusData } = useAnalyticsByStatus(filters)
    const { data: typeData } = useAnalyticsByType(filters)
    const { data: assetData } = useAnalyticsByAsset({ ...filters, limit: 10, orderBy: assetSortField })
    const { data: trendData } = useAnalyticsTrend({ ...filters, metric: 'count', granularity })

    const rootAssets = rootAssetsRes?.data || []
    const maintenanceTypes = factoryConfigRes?.data?.maintenanceTypes || []

    // ── Export handler ──────────────────────────────────────────────────────

    const handleExport = async (format: 'csv' | 'xlsx') => {
        setExportingFormat(format)
        try {
            await downloadAnalyticsExport(filters, format)
        } catch (err) {
            console.error('Export failed:', err)
        } finally {
            setExportingFormat(null)
        }
    }

    // ── Format helpers ──────────────────────────────────────────────────────

    const formatMinutes = (min: number | null) => {
        if (min === null) return '-'
        if (min < 60) return `${Math.round(min)} ${t('units.minutes')}`
        return `${(min / 60).toFixed(1)} ${t('units.hours')}`
    }

    const formatHours = (hours: number | null) => {
        if (hours === null) return '-'
        return `${hours.toFixed(1)} ${t('units.hours')}`
    }

    const formatDowntime = (min: number) => {
        if (min < 60) return `${Math.round(min)} ${t('units.minutes')}`
        return `${(min / 60).toFixed(1)} ${t('units.hours')}`
    }

    // ── KPI cards data ──────────────────────────────────────────────────────

    const kpis = [
        {
            title: t('kpis.totalWorkOrders'),
            value: summary?.totalWorkOrders ?? '-',
            icon: ClipboardList,
            change: summary?.previousPeriod?.totalWorkOrdersChange,
            color: 'text-blue-500',
        },
        {
            title: t('kpis.openWorkOrders'),
            value: summary?.openWorkOrders ?? '-',
            icon: FolderOpen,
            change: null,
            color: 'text-amber-500',
        },
        {
            title: t('kpis.avgMttr'),
            value: summary ? formatMinutes(summary.avgMttrMinutes) : '-',
            icon: Clock,
            change: summary?.previousPeriod?.avgMttrChange,
            invertChange: true, // Lower MTTR is better
            color: 'text-green-500',
        },
        {
            title: t('kpis.totalDowntime'),
            value: summary ? formatDowntime(summary.totalDowntimeMinutes) : '-',
            icon: TimerOff,
            change: summary?.previousPeriod?.totalDowntimeChange,
            invertChange: true, // Lower downtime is better
            color: 'text-red-500',
        },
        {
            title: t('kpis.mtbf'),
            value: summary ? formatHours(summary.mtbfHours) : '-',
            icon: Repeat,
            change: null,
            color: 'text-purple-500',
        },
    ]

    // ── Status pie chart data ───────────────────────────────────────────────

    const statusChartData = useMemo(() =>
        (statusData || []).map(item => ({
            name: item.label,
            value: item.count,
            color: STATUS_COLORS[item.label] || '#94a3b8',
        })),
        [statusData]
    )

    // ── Type pie chart data ─────────────────────────────────────────────────

    const typeChartData = useMemo(() =>
        (typeData || []).map((item, i) => ({
            name: item.label,
            value: item.count,
            color: PIE_COLORS[i % PIE_COLORS.length],
        })),
        [typeData]
    )

    // ── Trend chart data ────────────────────────────────────────────────────

    const trendChartData = useMemo(() =>
        (trendData || []).map(point => ({
            date: new Date(point.date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
            }),
            value: point.value,
        })),
        [trendData]
    )

    // ── Render ──────────────────────────────────────────────────────────────

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold tracking-tight">{t('maintenanceTitle')}</h2>
                <p className="text-muted-foreground">{t('maintenanceSubtitle')}</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-end gap-4">
                {/* Date Range Preset */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground">
                        {t('filters.dateRange')}
                    </label>
                    <select
                        value={datePreset}
                        onChange={(e) => setDatePreset(e.target.value)}
                        className="flex h-9 w-[160px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                        <option value="7d">{t('presets.7d')}</option>
                        <option value="30d">{t('presets.30d')}</option>
                        <option value="90d">{t('presets.90d')}</option>
                        <option value="12m">{t('presets.12m')}</option>
                        <option value="ytd">{t('presets.ytd')}</option>
                    </select>
                </div>

                {/* Asset Filter */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground">
                        {t('filters.asset')}
                    </label>
                    <select
                        value={selectedAssetId}
                        onChange={(e) => setSelectedAssetId(e.target.value)}
                        className="flex h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                        <option value="">{t('filters.allAssets')}</option>
                        {rootAssets.map(asset => (
                            <option key={asset.id} value={asset.id}>{asset.name}</option>
                        ))}
                    </select>
                </div>

                {/* Maintenance Type Filter */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-muted-foreground">
                        {t('filters.maintenanceType')}
                    </label>
                    <select
                        value={selectedMaintenanceType}
                        onChange={(e) => setSelectedMaintenanceType(e.target.value)}
                        className="flex h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                        <option value="">{t('filters.allTypes')}</option>
                        {maintenanceTypes.map(mt => (
                            <option key={mt.id} value={mt.id}>{mt.name}</option>
                        ))}
                    </select>
                </div>

                {/* Include Children Checkbox */}
                {selectedAssetId && (
                    <label className="flex items-center gap-2 h-9 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={includeChildren}
                            onChange={(e) => setIncludeChildren(e.target.checked)}
                            className="rounded border-input"
                        />
                        <span className="text-sm">{t('filters.includeChildren')}</span>
                    </label>
                )}
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {kpis.map((kpi, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {kpi.title}
                            </CardTitle>
                            <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {summaryLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : kpi.value}
                            </div>
                            {kpi.change !== null && kpi.change !== undefined && (
                                <p className={cn(
                                    "text-xs flex items-center gap-0.5 mt-1",
                                    (kpi.invertChange ? kpi.change < 0 : kpi.change > 0)
                                        ? "text-green-600"
                                        : kpi.change === 0
                                            ? "text-muted-foreground"
                                            : "text-red-600"
                                )}>
                                    {kpi.change > 0 ? <ArrowUp className="h-3 w-3" /> : kpi.change < 0 ? <ArrowDown className="h-3 w-3" /> : null}
                                    {Math.abs(kpi.change)}%
                                    <span className="text-muted-foreground ml-1">
                                        {t('comparison.vsPrevious')}
                                    </span>
                                </p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Work Orders Over Time */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">{t('charts.workOrdersOverTime')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            {trendChartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={trendChartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            allowDecimals={false}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={2}
                                            dot={{ r: 3 }}
                                            activeDot={{ r: 5 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                                    {t('charts.noData')}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* By Status Pie */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">{t('charts.byStatus')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            {statusChartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={statusChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={100}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {statusChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                            formatter={(value: number, name: string) => [`${value}`, name]}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            iconType="circle"
                                            formatter={(value: string) => (
                                                <span className="text-sm ml-1">{value}</span>
                                            )}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                                    {t('charts.noData')}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* By Maintenance Type */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">{t('charts.byType')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            {typeChartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={typeChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={100}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {typeChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                            formatter={(value: number, name: string) => [`${value}`, name]}
                                        />
                                        <Legend
                                            verticalAlign="bottom"
                                            iconType="circle"
                                            formatter={(value: string) => (
                                                <span className="text-sm ml-1">{value}</span>
                                            )}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                                    {t('charts.noData')}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Failing Assets */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">{t('charts.topFailingAssets')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            {(assetData || []).length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={(assetData || []).slice(0, 10)}
                                        layout="vertical"
                                        margin={{ left: 0, right: 16 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                        <YAxis
                                            type="category"
                                            dataKey="assetNameEn"
                                            fontSize={11}
                                            tickLine={false}
                                            axisLine={false}
                                            width={120}
                                            tick={{ fill: '#666' }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        />
                                        <Bar
                                            dataKey="workOrderCount"
                                            fill="hsl(var(--primary))"
                                            radius={[0, 4, 4, 0]}
                                            name={t('table.workOrders')}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                                    {t('charts.noData')}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Assets Breakdown Table */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">{t('table.assetsBreakdown')}</CardTitle>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExport('csv')}
                            disabled={!!exportingFormat}
                        >
                            {exportingFormat === 'csv' ? (
                                <Loader2 className="h-4 w-4 animate-spin ltr:mr-2 rtl:ml-2" />
                            ) : (
                                <Download className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                            )}
                            {t('export.csv')}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExport('xlsx')}
                            disabled={!!exportingFormat}
                        >
                            {exportingFormat === 'xlsx' ? (
                                <Loader2 className="h-4 w-4 animate-spin ltr:mr-2 rtl:ml-2" />
                            ) : (
                                <Download className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                            )}
                            {t('export.excel')}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('table.asset')}</TableHead>
                                <TableHead>
                                    <button
                                        className="flex items-center gap-1 hover:text-foreground"
                                        onClick={() => setAssetSortField('count')}
                                    >
                                        {t('table.workOrders')}
                                        <ArrowUpDown className={cn("h-3 w-3", assetSortField === 'count' && "text-primary")} />
                                    </button>
                                </TableHead>
                                <TableHead>
                                    <button
                                        className="flex items-center gap-1 hover:text-foreground"
                                        onClick={() => setAssetSortField('downtime')}
                                    >
                                        {t('table.downtime')}
                                        <ArrowUpDown className={cn("h-3 w-3", assetSortField === 'downtime' && "text-primary")} />
                                    </button>
                                </TableHead>
                                <TableHead>
                                    <button
                                        className="flex items-center gap-1 hover:text-foreground"
                                        onClick={() => setAssetSortField('mttr')}
                                    >
                                        {t('table.avgMttr')}
                                        <ArrowUpDown className={cn("h-3 w-3", assetSortField === 'mttr' && "text-primary")} />
                                    </button>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(assetData || []).length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                        {t('charts.noData')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                (assetData || []).map(asset => (
                                    <TableRow key={asset.assetId}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{asset.assetNameEn}</div>
                                                <div className="text-xs text-muted-foreground">{asset.assetPath}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{asset.workOrderCount}</TableCell>
                                        <TableCell>{formatDowntime(asset.totalDowntimeMinutes)}</TableCell>
                                        <TableCell>{formatMinutes(asset.avgMttrMinutes)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
