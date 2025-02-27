"use client"

import type * as React from "react"
import { LayoutDashboard, ClipboardList, User, Blocks, MessageCircle, MousePointerClick, Cog } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import './globals.css'
import { Inter } from 'next/font/google'
import FBLogo from "@/images/formbricks-wordmark.svg";
import type { NavigationItem, LayoutProps } from "@/types/layout";


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
import { FormbricksLogo, } from "@/components/ui/formbricks-logo"

const inter = Inter({ subsets: ['latin'] })

const navigation: NavigationItem[] = [
  { name: "Surveys", href: "/surveys", icon: MessageCircle },
  { name: "Dashboards", href: "/dashboards", icon: LayoutDashboard },
  { name: "Contacts", href: "/contacts", icon: User },
  { name: "Actions", href: "/actions", icon: MousePointerClick },
  { name: "Integrations", href: "/integrations", icon: Blocks },
  { name: "Configuration", href: "/configuration", icon: Cog },
]

export default function RootLayout({
  children,
}: LayoutProps) {
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
        			  <Image src={FBLogo} width={160} height={30} alt="Formbricks Logo" />
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
            <div className="flex-1 overflow-auto ">{children}</div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

