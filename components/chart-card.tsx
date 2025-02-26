import type * as React from "react"
import { Copy, Edit2, SlidersHorizontal, Trash2 } from "lucide-react"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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

// Sample data for the charts
const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
]

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
]

interface Chart {
  id: string
  title: string
  dataSource: "surveys" | "responses"
  selectedItems: Array<{ id: number; type: "survey" | "question" }>
  chartType: "pie" | "bar" | "line"
  timeFrame: "day" | "week" | "month" | "year" | "total"
  sortOrder: "asc" | "desc"
}

interface ChartCardProps {
  chart: Chart
  onEdit: (e: React.MouseEvent<HTMLElement>) => void
  onClone: () => void
  onDelete: () => void
}

function ChartPreview({ type, data }: { type: Chart["chartType"]; data: any[] }) {
  switch (type) {
    case "pie":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="var(--brand)"
              dataKey="value"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      )
    case "bar":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="var(--brand)" />
          </BarChart>
        </ResponsiveContainer>
      )
    case "line":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line type="monotone" dataKey="value" stroke="var(--brand)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )
  }
}

export function ChartCard({ chart, onEdit, onClone, onDelete }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{chart.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {chart.selectedItems.length} items • {chart.timeFrame} view
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onClone}>
                <Copy className="mr-2 h-4 w-4" />
                Clone
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Chart</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this chart? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ChartPreview type={chart.chartType} data={chart.chartType === "pie" ? pieData : sampleData} />
        </div>
      </CardContent>
    </Card>
  )
}

