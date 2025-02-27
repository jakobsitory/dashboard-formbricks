"use client"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import type { DashboardStats } from "@/types/dashboard";

import { Button } from "@/components/ui/button"
import { TitleBar } from "@/components/title-bar"
import { TopControlBar } from "@/components/top-control-bar"

export default function DashboardsPage() {
  const router = useRouter()

  return (
    <div className="flex h-full flex-col">
      <TopControlBar />
      <div className="flex flex-col flex-1">
        <TitleBar title="Dashboards">
          <Button onClick={() => router.push("/dashboards/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Dashboard
          </Button>
        </TitleBar>
        <main className="flex-1 p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Button
              variant="outline"
              className="flex h-[300px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-secondary hover:border-brand hover:bg-accent"
              onClick={() => router.push("/dashboards/new")
			  }
            >
              <Plus className="h-8 w-8" />
              <span>Create Dashboard</span>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}

