import { Zap, FileText, Package, TrendingUp, X, ArrowRight, ChevronRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type InsightCategory = 'reliability' | 'docs' | 'inventory' | 'performance'
export type InsightPriority = 'high' | 'medium' | 'low'

interface InsightCardProps {
    category: InsightCategory
    title: string
    priority: InsightPriority
    description: string
    evidence: string[]
    primaryActionLabel: string
    onPrimaryAction: () => void
    onViewEvidence: () => void
    onDismiss: () => void
}

const categoryIcons: Record<InsightCategory, LucideIcon> = {
    reliability: Zap,
    docs: FileText,
    inventory: Package,
    performance: TrendingUp,
}

const categoryColors: Record<InsightCategory, string> = {
    reliability: 'text-amber-500',
    docs: 'text-blue-500',
    inventory: 'text-purple-500',
    performance: 'text-green-500',
}

const priorityConfig: Record<InsightPriority, { bg: string; text: string; border: string }> = {
    high: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20' },
    medium: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
    low: { bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/20' },
}

export function InsightCard({
    category,
    title,
    priority,
    description,
    evidence,
    primaryActionLabel,
    onPrimaryAction,
    onViewEvidence,
    onDismiss,
}: InsightCardProps) {
    const Icon = categoryIcons[category]
    const priorityStyles = priorityConfig[priority]

    return (
        <div className="group relative overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm transition-all hover:bg-card hover:shadow-lg">
            <div className={cn("absolute left-0 top-0 bottom-0 w-1", priorityStyles.bg.replace('/10', ''))} />

            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3">
                        <div className={cn("p-2 rounded-lg bg-background/50 border shadow-sm", categoryColors[category])}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg leading-tight mb-1">{title}</h3>
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "px-2 py-0.5 rounded-full text-xs font-medium border uppercase tracking-wider",
                                    priorityStyles.bg,
                                    priorityStyles.text,
                                    priorityStyles.border
                                )}>
                                    {priority} Priority
                                </span>
                                <span className="text-xs text-muted-foreground">• Now</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={onDismiss}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Body */}
                <div className="pl-12">
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {evidence.map((item, index) => (
                            <button
                                key={index}
                                onClick={onViewEvidence}
                                className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary/50 hover:bg-secondary text-xs font-medium text-secondary-foreground transition-colors border border-transparent hover:border-border cursor-pointer"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer / Action Bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-muted/30 border-t pl-12">
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        onClick={onPrimaryAction}
                        className={cn(priority === 'high' ? "bg-orange-600 hover:bg-orange-700 text-white" : "")}
                    >
                        {primaryActionLabel}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    {/* <Button variant="outline" size="sm" onClick={onViewEvidence}>
            View Evidence
          </Button> */}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onViewEvidence}
                    className="text-muted-foreground hover:text-foreground group/ev"
                >
                    View Evidence
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/ev:translate-x-0.5" />
                </Button>
            </div>
        </div>
    )
}
