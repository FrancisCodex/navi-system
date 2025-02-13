import { AppSidebar } from "@/components/app-sidebar"
import { DashNavbar } from "@/components/dashnav"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"
import { ReactNode } from "react"
import IncubateeNavLinks from "@/constants/incubatee_link"
import SidebarLinks from "@/constants/sidebar_links"
import Loading from "@/components/loading"

interface PrivateLayoutProps {
  children: ReactNode
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div><Loading/></div>
  }

  let navLinks: any[] = [];
  if (user?.role === 'admin') {
    navLinks = SidebarLinks;
  } else if (user?.role === 'incubatee') {
    navLinks = IncubateeNavLinks;
  }

  return (
    <SidebarProvider>
      <AppSidebar navLinks={navLinks || []} />
      <SidebarInset className="overflow-hidden">
        <header className="fixed md:static bg-background z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <DashNavbar />
        </header>
        <div className="overflow-y-auto pt-16 md:pt-0 bg-zinc-50 dark:bg-background h-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default PrivateLayout