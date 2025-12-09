import * as React from "react"
import { cn } from "@/lib/utils"

interface TimelineProps {
  items: {
    id: string
    date: string
    title: string
    description?: string
    icon?: React.ReactNode
    status?: string
  }[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {items.map((item, index) => (
        <div key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
          {index !== items.length - 1 && (
            <div className="absolute left-[19px] top-5 bottom-0 w-px bg-border" />
          )}
          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm">
            {item.icon}
          </div>
          <div className="flex flex-col pt-1 w-full">
            <div className="flex items-center gap-2 w-full">
              <span className="font-semibold text-foreground">{item.title}</span>
              <span className="ml-auto text-xs text-muted-foreground text-right whitespace-nowrap tabular-nums">
                {item.date}
              </span>
            </div>
            {item.description && (
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

