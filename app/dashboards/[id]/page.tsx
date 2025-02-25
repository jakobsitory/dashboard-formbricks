"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  BarChart3,
  ChevronRight,
  ClipboardList,
  Edit2,
  FileQuestion,
  LayoutDashboard,
  Plus,
  SlidersHorizontal,
  Undo2,
  Users,
  Check,
  Copy,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
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
import { ArrowDownAZ, ArrowUpAZ, Calendar, Clock, History, Trash2, CalendarDays, CalendarRange } from "lucide-react"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Sample data
const surveys = [
  {
    id: 1,
    name: "Customer Satisfaction Survey",
    questions: [
      { id: 1, text: "How satisfied are you with our service?", type: "rating" },
      { id: 2, text: "Would you recommend us?", type: "boolean" },
    ],
  },
  {
    id: 2,
    name: "Employee Feedback",
    questions: [
      { id: 3, text: "Rate your work-life balance", type: "rating" },
      { id: 4, text: "How often do you work overtime?", type: "frequency" },
    ],
  },
]

type ChartType = "pie" | "bar" | "line"
type TimeFrame = "day" | "week" | "month" | "year" | "total"
type SortOrder = "asc" | "desc"

interface ChartSettings {
  title: string
  dataSource: "surveys" | "responses"
  selectedItems: Array<{ id: number; type: "survey" | "question" }>
  chartType: ChartType
  timeFrame: TimeFrame
  sortOrder: SortOrder
}

interface Chart extends ChartSettings {
  id: string
}

// Sample data for charts
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

function ChartPreview({ type, data }: { type: ChartType; data: any[] }) {
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
              fill="hsl(var(--primary))"
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
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      )
    case "line":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )
    default:
      return null
  }
}

function ChartEditor({
  onSave,
  initialSettings,
  onCancel,
  animationTarget,
}: {
  onSave: (settings: ChartSettings) => void
  initialSettings?: ChartSettings
  onCancel: () => void
  animationTarget?: DOMRect | null
}) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = React.useState(true)
  const [settings, setSettings] = React.useState<ChartSettings>(
    initialSettings || {
      title: "Untitled Chart",
      dataSource: "surveys",
      selectedItems: [],
      chartType: "bar",
      timeFrame: "month",
      sortOrder: "desc",
    },
  )

  const handleToggleItem = (item: { id: number; type: "survey" | "question" }) => {
    setSettings((prevSettings) => {
      const itemExists = prevSettings.selectedItems.some(
        (selectedItem) => selectedItem.id === item.id && selectedItem.type === item.type,
      )

      if (itemExists) {
        return {
          ...prevSettings,
          selectedItems: prevSettings.selectedItems.filter(
            (selectedItem) => !(selectedItem.id === item.id && selectedItem.type === item.type),
          ),
        }
      } else {
        return {
          ...prevSettings,
          selectedItems: [...prevSettings.selectedItems, item],
        }
      }
    })
  }

  React.useEffect(() => {
    if (editorRef.current && animationTarget) {
      const editor = editorRef.current
      const editorRect = editor.getBoundingClientRect()

      // Calculate the scale and translation
      const scaleX = animationTarget.width / editorRect.width
      const scaleY = animationTarget.height / editorRect.height
      const translateX = animationTarget.left - editorRect.left
      const translateY = animationTarget.top - editorRect.top

      // Apply initial transform
      editor.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`

      // Force reflow
      editor.offsetHeight

      // Animate to final position
      editor.style.transform = "none"

      const onTransitionEnd = () => {
        setIsAnimating(false)
        editor.removeEventListener("transitionend", onTransitionEnd)
      }

      editor.addEventListener("transitionend", onTransitionEnd)

      return () => {
        editor.removeEventListener("transitionend", onTransitionEnd)
      }
    } else {
      setIsAnimating(false)
    }
  }, [animationTarget])

  const handleSave = () => {
    if (editorRef.current && animationTarget) {
      const editor = editorRef.current
      setIsAnimating(true)

      // Calculate the scale and translation
      const editorRect = editor.getBoundingClientRect()
      const scaleX = animationTarget.width / editorRect.width
      const scaleY = animationTarget.height / editorRect.height
      const translateX = animationTarget.left - editorRect.left
      const translateY = animationTarget.top - editorRect.top

      // Apply transform
      editor.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`

      // Wait for animation to complete
      editor.addEventListener(
        "transitionend",
        () => {
          onSave(settings)
        },
        { once: true },
      )
    } else {
      onSave(settings)
    }
  }

  const handleCancel = () => {
    if (editorRef.current && animationTarget) {
      const editor = editorRef.current
      setIsAnimating(true)

      // Calculate the scale and translation
      const editorRect = editor.getBoundingClientRect()
      const scaleX = animationTarget.width / editorRect.width
      const scaleY = animationTarget.height / editorRect.height
      const translateX = animationTarget.left - editorRect.left
      const translateY = animationTarget.top - editorRect.top

      // Apply transform
      editor.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`

      // Wait for animation to complete
      editor.addEventListener(
        "transitionend",
        () => {
          onCancel()
        },
        { once: true },
      )
    } else {
      onCancel()
    }
  }

  return (
    <div
      ref={editorRef}
      className={`fixed inset-0 z-50 flex flex-col bg-background transition-transform duration-300 ease-in-out ${
        isAnimating ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      <div className="flex flex-col">
        <div className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-background px-4">
          <Input
            value={settings.title}
            onChange={(e) => setSettings({ ...settings, title: e.target.value })}
            className="h-7 w-[300px] text-lg font-semibold"
          />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <Undo2 className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              Save Chart
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex justify-center">
              <ToggleGroup
                type="single"
                value={settings.dataSource}
                onValueChange={(value) => setSettings({ ...settings, dataSource: value as "surveys" | "responses" })}
                className="justify-center"
              >
                <ToggleGroupItem value="surveys" className="flex gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Surveys
                </ToggleGroupItem>
                <ToggleGroupItem value="responses" className="flex gap-2">
                  <Users className="h-4 w-4" />
                  Responses
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label>Select {settings.dataSource === "surveys" ? "Surveys" : "Questions"}</Label>
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {settings.dataSource === "surveys" ? (
                    surveys.map((survey) => (
                      <CommandItem key={survey.id} onSelect={() => handleToggleItem({ id: survey.id, type: "survey" })}>
                        <div className="flex items-center gap-2">
                          {settings.selectedItems.some((item) => item.id === survey.id && item.type === "survey") ? (
                            <div className="rounded-sm bg-primary p-0.5 text-primary-foreground">
                              <Check className="h-3 w-3" />
                            </div>
                          ) : (
                            <div className="h-3 w-3 rounded-sm border" />
                          )}
                          <ClipboardList className="mr-2 h-4 w-4" />
                          {survey.name}
                        </div>
                      </CommandItem>
                    ))
                  ) : (
                    <CommandGroup>
                      {surveys.flatMap((survey) =>
                        survey.questions.map((question) => (
                          <CommandItem
                            key={question.id}
                            onSelect={() => handleToggleItem({ id: question.id, type: "question" })}
                          >
                            <div className="flex items-center gap-2">
                              {settings.selectedItems.some(
                                (item) => item.id === question.id && item.type === "question",
                              ) ? (
                                <div className="rounded-sm bg-primary p-0.5 text-primary-foreground">
                                  <Check className="h-3 w-3" />
                                </div>
                              ) : (
                                <div className="h-3 w-3 rounded-sm border" />
                              )}
                              <FileQuestion className="mr-2 h-4 w-4" />
                              {question.text}
                            </div>
                          </CommandItem>
                        )),
                      )}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </div>

            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Add Filter
            </Button>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Chart Type</Label>
                <ToggleGroup
                  type="single"
                  value={settings.chartType}
                  onValueChange={(value) => setSettings({ ...settings, chartType: value as ChartType })}
                  className="grid grid-cols-3"
                >
                  <ToggleGroupItem value="pie" className="flex flex-col items-center gap-1 p-2">
                    <PieChart className="h-4 w-4" />
                    <span className="text-xs">Pie Chart</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="bar" className="flex flex-col items-center gap-1 p-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="text-xs">Bar Chart</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="line" className="flex flex-col items-center gap-1 p-2">
                    <LineChart className="h-4 w-4" />
                    <span className="text-xs">Line Chart</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="space-y-2">
                <Label>Time Frame</Label>
                <ToggleGroup
                  type="single"
                  value={settings.timeFrame}
                  onValueChange={(value) => setSettings({ ...settings, timeFrame: value as TimeFrame })}
                  className="grid grid-cols-5"
                >
                  <ToggleGroupItem value="day" className="flex flex-col items-center gap-1 p-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Day</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="week" className="flex flex-col items-center gap-1 p-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Week</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="month" className="flex flex-col items-center gap-1 p-2">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-xs">Month</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="year" className="flex flex-col items-center gap-1 p-2">
                    <CalendarRange className="h-4 w-4" />
                    <span className="text-xs">Year</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="total" className="flex flex-col items-center gap-1 p-2">
                    <History className="h-4 w-4" />
                    <span className="text-xs">Total</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="space-y-2">
                <Label>Sort Order</Label>
                <ToggleGroup
                  type="single"
                  value={settings.sortOrder}
                  onValueChange={(value) => setSettings({ ...settings, sortOrder: value as SortOrder })}
                  className="grid grid-cols-2"
                >
                  <ToggleGroupItem value="asc" className="flex flex-col items-center gap-1 p-2">
                    <ArrowUpAZ className="h-4 w-4" />
                    <span className="text-xs">Ascending</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="desc" className="flex flex-col items-center gap-1 p-2">
                    <ArrowDownAZ className="h-4 w-4" />
                    <span className="text-xs">Descending</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>

          <Card className="lg:sticky lg:top-[3.5rem]">
            <CardHeader>
              <CardTitle>{settings.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {settings.selectedItems.length} items selected • {settings.timeFrame} view
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartPreview type={settings.chartType} data={settings.chartType === "pie" ? pieData : sampleData} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ChartCard({
  chart,
  onEdit,
  onClone,
  onDelete,
}: {
  chart: Chart
  onEdit: (e: React.MouseEvent<HTMLElement>) => void
  onClone: () => void
  onDelete: () => void
}) {
    <RootLayout></RootLayout>
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

export default function DashboardDetail() {
  const params = useParams()
  const router = useRouter()
  const [isEditing, setIsEditing] = React.useState(params.id === "new")
  const [title, setTitle] = React.useState("Untitled Dashboard")
  const [charts, setCharts] = React.useState<Chart[]>([])
  const [editingChart, setEditingChart] = React.useState<Chart | null>(null)
  const [isAddingChart, setIsAddingChart] = React.useState(false)
  const [animationTarget, setAnimationTarget] = React.useState<DOMRect | null>(null)

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
  }

  const handleSaveChart = (settings: ChartSettings) => {
    if (editingChart) {
      setCharts(charts.map((chart) => (chart.id === editingChart.id ? { ...settings, id: editingChart.id } : chart)))
      setEditingChart(null)
    } else {
      setCharts([...charts, { ...settings, id: Math.random().toString() }])
    }
    setIsAddingChart(false)
  }

  const handleEditChart = (chart: Chart, event: React.MouseEvent<HTMLElement>) => {
    const card = event.currentTarget.closest(".chart-card")
    if (card instanceof HTMLElement) {
      setAnimationTarget(card.getBoundingClientRect())
    }
    setEditingChart(chart)
    setIsAddingChart(true)
  }

  const handleCloneChart = (chart: Chart) => {
    const clone = { ...chart, id: Math.random().toString(), title: `${chart.title} (Copy)` }
    setCharts([...charts, clone])
  }

  const handleDeleteChart = (chartId: string) => {
    setCharts(charts.filter((chart) => chart.id !== chartId))
  }

  const handleAddChart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    setAnimationTarget(button.getBoundingClientRect())
    setIsAddingChart(true)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4">
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
          <main className="relative flex-1">
            {(isAddingChart || editingChart) && (
              <ChartEditor
                onSave={handleSaveChart}
                initialSettings={editingChart || undefined}
                onCancel={() => {
                  setIsAddingChart(false)
                  setEditingChart(null)
                  setAnimationTarget(null)
                }}
                animationTarget={animationTarget}
              />
            )}
            {charts.length === 0 && !isAddingChart ? (
              <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <LayoutDashboard className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="mt-4 text-xl font-semibold">No charts yet</h2>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">Get started by creating your first chart</p>
                <Button onClick={() => setIsAddingChart(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Create Chart
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-3">
                {charts.map((chart) => (
                  <div key={chart.id} className="chart-card">
                    <ChartCard
                      chart={chart}
                      onEdit={(e) => handleEditChart(chart, e)}
                      onClone={() => handleCloneChart(chart)}
                      onDelete={() => handleDeleteChart(chart.id)}
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="flex h-[300px] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed"
                  onClick={handleAddChart}
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

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard" size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-md border border-border bg-background">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                  <path d="M12 3v6" />
                </svg>
              </div>
              <span className="font-semibold">Brand</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Surveys" isActive>
              <LayoutDashboard className="h-4 w-4" />
              <span>Surveys</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Profile" className="flex items-center gap-3">
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                JD
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

