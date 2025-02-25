import "./globals.css"
import type * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarNavigation } from "@/components/sidebar-navigation"

export const metadata = {
  title: 'Formbricks Dashboard',
  description: 'Formbricks Dashboard Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-accent">
            <SidebarNavigation />
            <div className="flex-1 overflow-auto bg-white">{children}</div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

