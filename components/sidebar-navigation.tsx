"use client"

import { LayoutDashboard, ClipboardList, Users2, ListTodo, FolderKanban, Settings, MessageCircle, Cog, User, MousePointerClick, Blocks } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { navigationItems, mockUserProfile } from "@/app/mockData"

// Map of icon components for use with navigation data
const iconMap = {
  MessageCircle,
  LayoutDashboard,
  User,
  MousePointerClick,
  Blocks,
  Cog
};

// Define a type for the iconMap keys
type IconName = keyof typeof iconMap;

export function SidebarNavigation() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-secondary">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard" size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-brand text-primary">
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
        <SidebarMenu>
          {navigationItems.map((item) => {
            const IconComponent = iconMap[item.icon as IconName];
            return (
              <SidebarMenuItem key={item.name}>
                <Link href={item.href}>
                  <SidebarMenuButton tooltip={item.name} isActive={pathname.startsWith(item.href)}>
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Profile" className="flex items-center gap-3">
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-brand text-primary">
                {mockUserProfile.initials}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{mockUserProfile.name}</span>
                <span className="text-xs text-muted-foreground">{mockUserProfile.email}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
