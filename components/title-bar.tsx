import type * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"

interface TitleBarProps {
  title: string
  subtitle?: string
  subtitlePlaceholder?: string
  onSubtitleChange?: (value: string) => void
  children?: React.ReactNode
}

export function TitleBar({ title, subtitle, subtitlePlaceholder, onSubtitleChange, children }: TitleBarProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b pt-6 pb-4 px-6">
      <SidebarTrigger />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold text-primary">{title}</h1>
          {(subtitle !== undefined || onSubtitleChange) && (
            <>
              <span className="text-3xl text-primary">/</span>
              <Input
                value={subtitle}
                onChange={(e) => onSubtitleChange?.(e.target.value)}
                placeholder={subtitlePlaceholder}
                className="h-9 text-xl border-2 focus-visible:ring-0"
              />
            </>
          )}
        </div>
        <div className="flex items-center gap-2 [&>button]:flex-row-reverse">{children}</div>
      </div>
    </header>
  )
}

