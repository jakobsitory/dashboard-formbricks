import type * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface TitleBarProps {
  title: string
  children?: React.ReactNode
}

export function TitleBar({ title, children }: TitleBarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b px-6">
      
	<SidebarTrigger />
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-3xl font-semibold text-primary">{title}</h1>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </header>
  )
}

