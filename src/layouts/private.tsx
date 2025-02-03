import { AppSidebar } from "@/components/app-sidebar"
import { DashNavbar } from "@/components/dashnav"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ReactNode } from "react"

interface PrivateLayoutProps {
  children: ReactNode
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <DashNavbar />
        </header>
        <div className="overflow-y-auto bg-zinc-50 dark:bg-background h-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default PrivateLayout