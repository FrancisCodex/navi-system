import * as React from "react"
import { LogOut } from "lucide-react"
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
import { useAuth } from '@/context/AuthProvider'
import { useNavigate } from "react-router-dom"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navLinks: any[]
}

export function AppSidebar({ navLinks, ...props }: AppSidebarProps) {
  const { state } = useSidebar()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {state === "collapsed" ? (
          <h1>NAV</h1> 
        ) : (
          <h1>Navigatu</h1>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navLinks} />
      </SidebarContent>
      <SidebarFooter>
        {/* Logout Button */}
        <div className="flex justify-center">
          {state === "collapsed" ? (
            <Button variant="ghost" size="icon" className="w-fit p-3" onClick={handleLogout}>
              <LogOut />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="w-fit p-3" onClick={handleLogout}>
              <LogOut />
              Logout
            </Button>
          )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}