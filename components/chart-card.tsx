import type * as React from "react"
import { Copy, Edit2, SlidersHorizontal, Trash2 } from "lucide-react"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Cell, LabelList } from "recharts"

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
import { sampleData, pieData } from "@/app/mockData/chartData"

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
  preview?: boolean
}

function ChartPreview({ type, data }: { type: Chart["chartType"]; data: any[] }) {
  // Add custom colors for pie chart segments
  const pieColors = [
    "var(--formbricks-500)",
    "var(--formbricks-400)",
    "var(--formbricks-300)",
    "var(--formbricks-200)",
  ];

  const CustomBarLabel = (props: any) => {
    const { x, y, width, value, name } = props;
    return (
      <g>
        {/* Name label on the left */}
        <text 
          x={x + 8} 
          y={y + 15} 
          textAnchor="start" 
          fill="var(--foreground)"
          fontSize={12}
        >
          {name.slice(0, 3)}
        </text>
        {/* Value label on the right */}
        <text 
          x={x + width + 8} 
          y={y + 15} 
          textAnchor="start" 
          fill="var(--foreground)"
          fontSize={12}
        >
          {value}
        </text>
      </g>
    );
  };

  switch (type) {
    case "pie":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )
    case "bar":
      return (
        <ResponsiveContainer width="100%" height={Math.max(200, data.length * 50)}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 32, bottom: 5, left: 16 }}
          >
            <YAxis
              type="category"
              dataKey="name"
              hide
            />
            <XAxis
              type="number"
              hide
            />
            <Bar
              dataKey="value"
              fill="var(--brand)"
              radius={[4, 4, 4, 4]}
              barSize={30}
            >
              <LabelList content={<CustomBarLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    case "line":
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="var(--formbricks-700)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--formbricks-700)"
              fontSize={12}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--formbricks-500)"
              strokeWidth={2}
              dot={{
                fill: "var(--formbricks-500)",
                stroke: "var(--formbricks-600)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )
  }
}

export function ChartCard({ chart, onEdit, onClone, onDelete, preview }: ChartCardProps) {
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
          {!preview && (
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
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <ChartPreview type={chart.chartType} data={chart.chartType === "pie" ? pieData : sampleData} />
        </div>
      </CardContent>
    </Card>
  )
}

