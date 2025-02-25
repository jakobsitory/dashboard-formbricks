"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import {
  AlertCircle,
  ChevronDown,
  Filter,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Plus,
  Search,
  Settings,
  Users2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

import api from '../api';

export default function DashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedType, setSelectedType] = React.useState("all")
  const [dashboards, setDashboards] = React.useState([]);

  React.useEffect(() => {
	const _dashboards = api.getDashboards();
	setDashboards(_dashboards)
  }, [])

  const filteredDashboards = dashboards.filter((dashboard) => {
    const matchesSearch = dashboard.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || dashboard.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-xl font-semibold">Dashboards</h1>
              <Button onClick={() => router.push("/dashboards/new")}>
                <Plus className="mr-2 h-4 w-4" /> Create Dashboard
              </Button>
            </div>
          </header>
          <div className="border-b bg-background px-6 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search dashboards..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedType} onValueChange={(value) => setSelectedType(value)}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Team">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <main className="flex-1 p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDashboards.map((dashboard) => (
                <div
                  key={dashboard.id}
                  className="relative flex flex-col rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="absolute right-4 top-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">{dashboard.name}</h3>
                    <p className="text-sm text-muted-foreground">{dashboard.description}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="rounded-md bg-red-100 p-1 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <span>Last updated {dashboard.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
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
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Contacts">
              <Users2 className="h-4 w-4" />
              <span>Contacts</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Actions">
              <ListTodo className="h-4 w-4" />
              <span>Actions</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Integrations">
              <FolderKanban className="h-4 w-4" />
              <span>Integrations</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Configuration">
              <Settings className="h-4 w-4" />
              <span>Configuration</span>
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

