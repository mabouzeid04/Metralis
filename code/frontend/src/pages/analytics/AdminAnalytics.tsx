import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    Activity,
    Clock,
    Search,
    AlertTriangle,
    BookOpen,
    Zap,
    RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { InsightCard, type InsightCategory, type InsightPriority } from '@/components/analytics/InsightCard'
import { api } from '@/lib/api'
import { useTranslation } from 'react-i18next'

type AnalyticsStats = {
    totalAiQueries: number
    avgDiagnosisTimeHours: number | null
    avgRepairTimeDays: number | null
    kbCoveragePercent: number
    totalMachines: number
    machinesWithDocs: number
    machinesWithoutDocs: Array<{ id: string; name: string }>
}

type SystemInsight = {
    id: string
    title: string
    content: string
    category: 'MAINTENANCE' | 'INVENTORY' | 'DOCUMENTATION' | 'TRAINING'
    priority: 'HIGH' | 'MEDIUM' | 'LOW'
    status: 'NEW' | 'REVIEWED' | 'ACTIONED' | 'DISMISSED'
    metadata?: {
        relatedWorkOrders?: string[]
        relatedMachines?: string[]
        relatedParts?: string[]
        dataPoints?: string[]
    }
    createdAt: string
}

const categoryMap: Record<SystemInsight['category'], InsightCategory> = {
    MAINTENANCE: 'reliability',
    INVENTORY: 'inventory',
    DOCUMENTATION: 'docs',
    TRAINING: 'performance',
}

const priorityMap: Record<SystemInsight['priority'], InsightPriority> = {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
}

const fetchAnalyticsStats = async (): Promise<AnalyticsStats> => {
    const response = await api.get('/analytics/stats')
    return response.data.data
}

const fetchInsights = async (): Promise<SystemInsight[]> => {
    const response = await api.get('/analytics/insights')
    return response.data.data
}

const generateInsights = async (): Promise<{ generated: number }> => {
    const response = await api.post('/analytics/insights/generate')
    return response.data.data
}

const updateInsightStatus = async ({ id, status }: { id: string; status: string }) => {
    const response = await api.patch(`/analytics/insights/${id}`, { status })
    return response.data.data
}

export default function AdminAnalytics() {
    const { t } = useTranslation('analytics')
    const queryClient = useQueryClient()

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['analytics', 'stats'],
        queryFn: fetchAnalyticsStats,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    const { data: insights = [], isLoading: insightsLoading } = useQuery({
        queryKey: ['analytics', 'insights'],
        queryFn: fetchInsights,
        staleTime: 1000 * 60 * 5,
    })

    const generateMutation = useMutation({
        mutationFn: generateInsights,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['analytics', 'insights'] })
        },
    })

    const dismissMutation = useMutation({
        mutationFn: updateInsightStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['analytics', 'insights'] })
        },
    })

    const formatHours = (hours: number | null) => {
        if (hours === null) return t('time.notAvailable')
        if (hours < 1) return `${Math.round(hours * 60)}${t('time.minutes')}`
        return `${hours.toFixed(1)} ${t('time.hours')}`
    }

    const formatDays = (days: number | null) => {
        if (days === null) return t('time.notAvailable')
        if (days < 1) return `${Math.round(days * 24)} ${t('time.hours')}`
        return `${days.toFixed(1)} ${t('time.days')}`
    }

    const metrics = [
        {
            title: t('metrics.aiQueries.title'),
            value: stats?.totalAiQueries?.toLocaleString() ?? '-',
            icon: Search,
            description: t('metrics.aiQueries.description'),
            footer: t('metrics.aiQueries.footer')
        },
        {
            title: t('metrics.meanTimeToDiagnose.title'),
            value: formatHours(stats?.avgDiagnosisTimeHours ?? null),
            icon: Activity,
            description: t('metrics.meanTimeToDiagnose.description'),
            footer: t('metrics.meanTimeToDiagnose.footer')
        },
        {
            title: t('metrics.meanTimeToRepair.title'),
            value: formatDays(stats?.avgRepairTimeDays ?? null),
            icon: Clock,
            description: t('metrics.meanTimeToRepair.description'),
            footer: t('metrics.meanTimeToRepair.footer')
        },
        {
            title: t('metrics.knowledgeBaseCoverage.title'),
            value: `${Math.round(stats?.kbCoveragePercent ?? 0)}%`,
            icon: BookOpen,
            description: t('metrics.knowledgeBaseCoverage.description', {
                withDocs: stats?.machinesWithDocs ?? 0,
                total: stats?.totalMachines ?? 0
            }),
            footer: stats?.machinesWithoutDocs?.length ? (
                <span className="text-amber-500 font-medium flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3" />
                    {t('metrics.knowledgeBaseCoverage.footer.incomplete', {
                        machineName: stats.machinesWithoutDocs[0]?.name ?? t('common:states.unknown')
                    })}
                </span>
            ) : t('metrics.knowledgeBaseCoverage.footer.complete'),
        }
    ]

    const activeInsights = insights.filter(i => i.status !== 'DISMISSED')

    const getEvidenceFromMetadata = (insight: SystemInsight): string[] => {
        const evidence: string[] = []
        if (insight.metadata?.relatedWorkOrders?.length) {
            evidence.push(t('insights.evidence.workOrders', { count: insight.metadata.relatedWorkOrders.length }))
        }
        if (insight.metadata?.relatedMachines?.length) {
            evidence.push(t('insights.evidence.machines', { count: insight.metadata.relatedMachines.length }))
        }
        if (insight.metadata?.dataPoints) {
            evidence.push(...insight.metadata.dataPoints.slice(0, 2))
        }
        return evidence.length ? evidence : [t('insights.evidence.default')]
    }

    const getPrimaryAction = (category: SystemInsight['category']): string => {
        switch (category) {
            case 'MAINTENANCE': return t('insights.actions.scheduleInspection')
            case 'INVENTORY': return t('insights.actions.restockInventory')
            case 'DOCUMENTATION': return t('insights.actions.uploadManuals')
            case 'TRAINING': return t('insights.actions.scheduleTraining')
            default: return t('insights.actions.takeAction')
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
                <p className="text-muted-foreground">{t('subtitle')}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow relative overflow-hidden group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {metric.title}
                            </CardTitle>
                            <metric.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <div className="text-2xl font-bold">{statsLoading ? '...' : metric.value}</div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {metric.description}
                            </p>

                            <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                                {metric.footer}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{t('commandCenter.title')}</h2>
                            <p className="text-sm text-muted-foreground">{t('commandCenter.description')}</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generateMutation.mutate()}
                        disabled={generateMutation.isPending}
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${generateMutation.isPending ? 'animate-spin' : ''}`} />
{t('insights.generate')}
                    </Button>
                </div>

                <div className="grid gap-4">
                    {insightsLoading ? (
                        <div className="text-center py-8 text-muted-foreground">{t('insights.loading')}</div>
                    ) : activeInsights.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            {t('insights.empty')}
                        </div>
                    ) : (
                        activeInsights.map((insight) => (
                            <InsightCard
                                key={insight.id}
                                category={categoryMap[insight.category]}
                                title={insight.title}
                                priority={priorityMap[insight.priority]}
                                description={insight.content}
                                evidence={getEvidenceFromMetadata(insight)}
                                primaryActionLabel={getPrimaryAction(insight.category)}
                                onPrimaryAction={() => console.log('Primary action', insight.id)}
                                onViewEvidence={() => console.log('View evidence', insight.id)}
                                onDismiss={() => dismissMutation.mutate({ id: insight.id, status: 'DISMISSED' })}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
