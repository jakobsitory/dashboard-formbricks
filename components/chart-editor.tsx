"use client"

import * as React from "react"
import { useRef } from "react"
import {
  ArrowDownAZ,
  ArrowUpAZ,
  BarChartHorizontal,
  CalendarDays,
  Database,
  ChartSplineIcon,
  PieChartIcon,
  PaintbrushIcon,
  EyeIcon,
} from "lucide-react"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
  } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import SurveyQuestionSelector from "@/components/survey-question-selector"

// Import types and mock data from centralized data file
import { ChartSettings, ChartType, TimeFrame, SortOrder, mockSurveys, mockChartData, defaultChartSettings } from "@/app/mockData"

interface ChartEditorProps {
  onSave: (settings: ChartSettings) => void
  initialSettings?: ChartSettings
  onCancel: () => void
  className?: string
}

export function ChartEditor({ onSave, initialSettings, onCancel, className }: ChartEditorProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [contentVisible, setContentVisible] = React.useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [settings, setSettings] = React.useState<ChartSettings>(
    initialSettings || defaultChartSettings
  )

  React.useEffect(() => {
    if (editorRef.current) {
      // Force a reflow before starting the animation
      editorRef.current.getBoundingClientRect()

      // Start expansion animation
      requestAnimationFrame(() => {
        setIsExpanded(true)
        // Fade in content slightly after expansion begins
        setTimeout(() => {
          setContentVisible(true)
        }, 150) // Start fade-in halfway through the expansion
      })
    }
  }, [])

  const handleSave = async () => {
    setContentVisible(false)
    await new Promise((resolve) => setTimeout(resolve, 150)) // Wait for fade out
    setIsExpanded(false)
    await new Promise((resolve) => setTimeout(resolve, 300)) // Wait for collapse
    onSave(settings)
  }

  const handleCancel = async () => {
    setContentVisible(false)
    await new Promise((resolve) => setTimeout(resolve, 150)) // Wait for fade out
    setIsExpanded(false)
    await new Promise((resolve) => setTimeout(resolve, 300)) // Wait for collapse
    onCancel()
  }

  return (
    <Card
      ref={editorRef}
      className={`
        transform-gpu will-change-transform
        transition-[transform,grid-column-start,grid-column-end]
        duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isExpanded ? "col-span-full" : ""}
        ${className}
      `}
      style={{
        // Use transform scale for smoother animation
        transform: isExpanded ? "none" : "scale(0.98)",
      }}
    >
      <div
        ref={contentRef}
        className={`
          transform-gpu will-change-opacity
          transition-opacity duration-150 ease-in-out
          ${contentVisible ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <Input
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              className="h-9 w-[300px] text-lg"
              placeholder="Chart Title"
            />
            <div className="flex items-center gap-2">
            </div>
          </div>
		  <div className="flex items-center gap-2">
			<Button variant="outline"
			onClick={() => handleCancel()}>
		    	Cancel
		    </Button>
          <Button onClick={() => handleSave()}>Save</Button>
		  </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex flex-col">
            
			
			{/* Data Source Section */}
            <div className="space-y-6 p-4">
				<div className="flex flex-col rounded-lg border border-slate-300">
					<div className="flex items-center gap-x-2 rounded-t-lg border-b border-slate-300 bg-slate-100 px-4 py-2">
						<div className="rounded-full border border-slate-300 bg-white p-1">
							<Database className="h-3 w-3 text-slate-500" />				
						</div>
						<h2 className="text-md font-semibold text-slate-900">
							Data Source
						</h2>
					</div>
					<div className="space-y-4 p-4">
						{/* CONTENT TBD */}
						<SurveyQuestionSelector/>
					</div>
				</div>
            </div>

            {/* Appearance Section */}
            <div className="space-y-8 p-4">
				<div className="flex flex-col rounded-lg border border-slate-300">
					<div className="flex items-center gap-x-2 rounded-t-lg border-b border-slate-300 bg-slate-100 px-4 py-2">
						<div className="rounded-full border border-slate-300 bg-white p-1">
							<PaintbrushIcon className="h-3 w-3 text-slate-500" />				
						</div>
						<h2 className="text-md font-semibold text-slate-900">
							Appearance
						</h2>
					</div>
					<div className="space-y-2 p-4">
						<div className="space-y-2">
						<Label>Chart Type</Label>
						<ToggleGroup
						type="single"
						value={settings.chartType}
						onValueChange={(value) => setSettings({ ...settings, chartType: value as ChartType })}
						className="justify-start rounded-lg border border-slate-300 p-1"
						>
						<ToggleGroupItem value="pie" className="flex-1 items-center gap-2 px-3">
							<PieChartIcon className="h-5 w-5" />
							<span>Pie</span>
						</ToggleGroupItem>
						<ToggleGroupItem value="bar" className="flex-1 items-center gap-2 px-3">
							<BarChartHorizontal className="h-5 w-5" />
							<span>Bar</span>
						</ToggleGroupItem>
						<ToggleGroupItem value="line" className="flex-1 items-center gap-2 px-3">
							<ChartSplineIcon className="h-5 w-5" />
							<span>Line</span>
						</ToggleGroupItem>
						</ToggleGroup>
					</div>
					<div className="space-y-2">
						<Label>Time Frame</Label>
						<ToggleGroup
						type="single"
						value={settings.timeFrame}
						onValueChange={(value) => setSettings({ ...settings, timeFrame: value as TimeFrame })}
						className="justify-start rounded-lg border border-slate-300 p-1"
						>
						<ToggleGroupItem value="day" className="flex-1 items-center gap-2 px-3">
							<span>Day</span>
						</ToggleGroupItem>
						<ToggleGroupItem value="week" className="flex-1 items-center gap-2 px-3">
							<span>Week</span>
						</ToggleGroupItem>
						<ToggleGroupItem value="month" className="flex-1 flex items-center gap-2 px-3">
							<span>Month</span>
						</ToggleGroupItem>
						<ToggleGroupItem value="year" className="flex-1 items-center gap-2 px-3">
							<span>Year</span>
						</ToggleGroupItem>
						<ToggleGroupItem value="total" className="flex-1 items-center gap-2 px-3">
							<span>Total</span>
						</ToggleGroupItem>
						</ToggleGroup>
					</div>
					</div>
				</div>
            </div>
          </div>

          <div className="p-4">
		  {/* Data Source Section */}
			<div className="flex flex-col rounded-lg border border-slate-300">
				<div className="flex items-center gap-x-2 rounded-t-lg border-b border-slate-300 bg-slate-100 px-4 py-2">
					<div className="rounded-full border border-slate-300 bg-white p-1">
						<EyeIcon className="h-3 w-3 text-slate-500" />				
					</div>
					<h2 className="text-md font-semibold text-slate-900">
						Preview
					</h2>
				</div>
				<div className="space-y-4 p-4">
					<Card className="h-full">
					<div className="flex h-full flex-col">
						<div className="border-b p-4">
						<h3 className="text-lg font-semibold">{settings.title || "Chart Preview"}</h3>
						<p className="text-sm text-muted-foreground">
							{settings.selectedItems.length} items selected • {settings.timeFrame} view
						</p>
						</div>
						<div className="flex-1 p-6">
						<div className="h-full min-h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
							{settings.chartType === "pie" ? (
								<PieChart>
								<Pie
									data={mockChartData}
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={80}
									fill="var(--brand)"
									dataKey="value"
									label
								/>
								</PieChart>
							) : settings.chartType === "bar" ? (
								<BarChart data={mockChartData}>
								<XAxis dataKey="name" />
								<YAxis />
								<Bar dataKey="value" fill="var(--brand)" />
								</BarChart>
							) : (
								<LineChart data={mockChartData}>
								<XAxis dataKey="name" />
								<YAxis />
								<Line type="monotone" dataKey="value" stroke="var(--brand)" strokeWidth={2} />
								</LineChart>
							)}
							</ResponsiveContainer>
						</div>
						</div>
					</div>
					</Card>
				</div>
				</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

