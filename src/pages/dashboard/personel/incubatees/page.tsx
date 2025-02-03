import teams from "@/constants/teams"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TeamCard } from "@/components/team-card"
import { Link } from "react-router-dom"
const IncubateeList = () => {

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <h1 className="text-lg font-semibold">Incubatee Teams</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Team
          </Button>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Link key={team.id} to={`/dashboard/incubatees/${team.id}`}>
              <TeamCard team={team} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IncubateeList