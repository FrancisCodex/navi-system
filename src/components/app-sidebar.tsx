import * as React from "react"
import {
  Frame,
  Map,
  PieChart,
  LogOut,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import SidebarLinks from "@/constants/sidebar_links"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {state === "collapsed" ? (
          <h1>NAV</h1> ): 
          (
          <h1>Navigatu</h1>
          )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SidebarLinks} />
      </SidebarContent>
      <SidebarFooter>
      {/* Logout Button */}
      <div className="flex justify-center">
        {
          state === "collapsed" ? (
            <a href="/">
            <Button variant="ghost" size="icon" className="w-fit p-3">
              <LogOut />
            </Button>
            </a>

          ) : (
            <a href="/">
            <Button variant="ghost" size="icon" className="w-fit p-3">
              <LogOut />
              Logout
            </Button>
            </a>
          )
        }
      </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}