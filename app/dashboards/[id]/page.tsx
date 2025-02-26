"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { Plus, Share2, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ChartEditor } from "@/components/chart-editor"
import { TitleBar } from "@/components/title-bar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ChartCard } from "@/components/chart-card"
import { AddChartCard } from "@/components/add-chart-card"

// Import types and mock data
import { Chart, ChartSettings, mockDashboardData } from "@/app/mockData"

export default function DashboardDetail() {
  const params = useParams()
  const router = useRouter()
  const [title, setTitle] = React.useState(mockDashboardData.title)
  const [charts, setCharts] = React.useState<Chart[]>(mockDashboardData.charts)
  const [isAddingChart, setIsAddingChart] = React.useState(false)
  const [editingChart, setEditingChart] = React.useState<Chart | null>(null)
  const [sourceRect, setSourceRect] = React.useState<DOMRect | null>(null)
  const [editingPosition, setEditingPosition] = React.useState<number | null>(null)

  const handleStartEdit = (index: number) => {
    setEditingPosition(index)
    setIsAddingChart(true)
  }

  const handleAddChart = () => {
    setEditingPosition(charts.length)
    setIsAddingChart(true)
  }

  const handleEditChart = (chart: Chart, event: React.MouseEvent<HTMLElement>) => {
    const card = event.currentTarget.closest(".chart-card")
    if (card instanceof HTMLElement) {
      setSourceRect(card.getBoundingClientRect())
    }
    setEditingChart(chart)
    setIsAddingChart(true)
  }

  const handleAddChartOld = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    setSourceRect(button.getBoundingClientRect())
    setIsAddingChart(true)
  }

  const handleSaveChart = (settings: ChartSettings) => {
    if (editingPosition !== null && editingPosition < charts.length) {
      // Editing existing chart
      setCharts(charts.map((chart, i) => (i === editingPosition ? { ...settings, id: chart.id } : chart)))
    } else {
      // Adding new chart
      setCharts([...charts, { ...settings, id: Math.random().toString() }])
    }
    setIsAddingChart(false)
    setEditingPosition(null)
  }

  const handleDeleteDashboard = () => {
    router.push("/dashboards")
  }

  return (
    <div className="flex h-full flex-col">
      <TitleBar title={title}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Dashboard
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Dashboard</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this dashboard? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteDashboard}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Dashboard
        </Button>
        <Button onClick={() => setIsAddingChart(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Chart
        </Button>
      </TitleBar>

      <main className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {charts.map((chart, index) => (
            <React.Fragment key={chart.id}>
              {editingPosition === index ? (
                <ChartEditor
                  initialSettings={chart}
                  onSave={handleSaveChart}
                  onCancel={() => {
                    setIsAddingChart(false)
                    setEditingPosition(null)
                  }}
                />
              ) : (
                <div className="chart-card">
                  <ChartCard
                    chart={chart}
                    onEdit={() => handleStartEdit(index)}
                    onClone={() => {
                      const clone = { ...chart, id: Math.random().toString(), title: `${chart.title} (Copy)` }
                      setCharts([...charts, clone])
                    }}
                    onDelete={() => {
                      setCharts(charts.filter((_, i) => i !== index))
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
          {editingPosition === charts.length ? (
            <ChartEditor
              onSave={handleSaveChart}
              onCancel={() => {
                setIsAddingChart(false)
                setEditingPosition(null)
              }}
            />
          ) : (
            <AddChartCard onClick={handleAddChart} />
          )}
        </div>
      </main>
    </div>
  )
}

