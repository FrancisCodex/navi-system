import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"
import type { StartupGroup } from "@/constants/types"

interface StartupGroupsTableProps {
  startupGroups: StartupGroup[]
}

export function StartupGroupsTable({ startupGroups }: StartupGroupsTableProps) {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('startups')
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto">
        <div className="grid grid-cols-4 p-4 text-sm font-medium min-w-[600px]">
          <div>Startup Name</div>
          <div>Industry</div>
          <div>Leader</div>
          <div>Members</div>
        </div>
        <div className="divide-y">
          {startupGroups.map((group, index) => (
            <div key={index} className="grid grid-cols-4 items-center p-4 min-w-[600px]">
              <div className="font-medium">{group.startup_name}</div>
              <div>{group.industry}</div>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{group.leader_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{group.leader_name}</span>
              </div>
              <div>{group.total_members}</div>
            </div>
          ))}
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={handleNavigate}>
        View All Startup Groups
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  )
}