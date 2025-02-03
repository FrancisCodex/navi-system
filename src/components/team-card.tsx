import { Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TeamCardProps {
  team: {
    name: string
    project: string
    members: number
    advisor: string
    lastMeeting: string
    nextMeeting: string
    image: string
  }
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Avatar className="h-12 w-12">
            <AvatarImage src={team.image} alt={team.name} />
            <AvatarFallback>{team.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm">{team.members}</span>
          </div>
        </div>
        <CardTitle className="mt-4">{team.name}</CardTitle>
        <CardDescription>{team.project}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Advisor:</span>
            <span>{team.advisor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Meeting:</span>
            <span>{team.lastMeeting}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Next Meeting:</span>
            <span>{team.nextMeeting}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

