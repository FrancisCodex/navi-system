import { AppSidebar } from "@/components/app-sidebar"
import { DashNavbar } from "@/components/dashnav"
import { Separator } from "@/components/ui/separator"
import { LoaderCircle } from "lucide-react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useAuth } from '@/context/AuthProvider'
import { ReactNode } from "react"
import IncubateeNavLinks from "@/constants/incubatee_link"
import SidebarLinks from "@/constants/sidebar_links"

interface PrivateLayoutProps {
  children: ReactNode
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <LoaderCircle className="animate-spin h-6 w-6" />
    </div>
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
        <header className="fixed md:static bg-background w-full z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <DashNavbar />
        </header>
        <div className="overflow-y-auto pt-16 md:pt-0 dark:bg-background h-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default PrivateLayout