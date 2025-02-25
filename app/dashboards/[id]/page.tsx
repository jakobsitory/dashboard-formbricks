"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ChevronRight, Edit2, LayoutDashboard, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <Link href="/" className="flex items-center space-x-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="font-bold">Dashboard</span>
          </Link>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboards">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboards</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <SidebarInset>
          <p className="text-xs text-muted-foreground">Built by shadcn</p>
        </SidebarInset>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function DashboardDetail() {
  const params = useParams()
  const { id } = params;
  const router = useRouter()
  const [isEditing, setIsEditing] = React.useState(params.id === "new")
  const [title, setTitle] = React.useState(`Dashboard #${id}`)
  const [charts, setCharts] = React.useState<string[]>([])

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically save the title to your backend
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center gap-2">
              <Link href="/dashboards" className="text-xl font-semibold text-muted-foreground hover:text-foreground">
                Dashboards
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <form onSubmit={handleTitleSubmit} className="flex-1">
                  <Input
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-8 max-w-[300px] text-lg font-semibold"
                  />
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">{title}</h1>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </header>
          <main className="flex-1 p-6">
            {charts.length === 0 ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <LayoutDashboard className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="mt-4 text-xl font-semibold">No charts yet</h2>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">Get started by creating your first chart</p>
                <Button onClick={() => setCharts([...charts, "new-chart"])}>
                  <Plus className="mr-2 h-4 w-4" /> Create Chart
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {charts.map((chart, index) => (
                  <div key={index} className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                    {/* Chart content would go here */}
                    Chart {index + 1}
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="flex h-[200px] flex-col items-center justify-center gap-4 border-2 border-dashed"
                  onClick={() => setCharts([...charts, "new-chart"])}
                >
                  <Plus className="h-8 w-8" />
                  <span>Add Chart</span>
                </Button>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

