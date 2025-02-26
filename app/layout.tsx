"use client"

import type * as React from "react"
import { LayoutDashboard, ClipboardList, User, Blocks, MessageCircle, MousePointerClick, Cog } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import './globals.css'
import { Inter } from 'next/font/google'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"

const inter = Inter({ subsets: ['latin'] })

const navigation = [
  { name: "Surveys", href: "/surveys", icon: MessageCircle },
  { name: "Dashboards", href: "/dashboards", icon: LayoutDashboard },
  { name: "Contacts", href: "/contacts", icon: User },
  { name: "Actions", href: "/actions", icon: MousePointerClick },
  { name: "Integrations", href: "/integrations", icon: Blocks },
  { name: "Configuration", href: "/configuration", icon: Cog },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-accent">
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
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <Link href={item.href}>
                        <SidebarMenuButton tooltip={item.name} isActive={pathname.startsWith(item.href)}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg" tooltip="Profile" className="flex items-center gap-3">
                      <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-brand text-primary">
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
            <div className="flex-1 overflow-auto bg-slate-50">{children}</div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

