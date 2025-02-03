import Navbar from "@/components/navbar"
import { ReactNode } from "react"

interface PublicLayoutProps {
  children: ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div>
      <Navbar />
      {/* This layout is for public no authorization */}
      <main>
        {children}
      </main>
    </div>
  )
}

export default PublicLayout