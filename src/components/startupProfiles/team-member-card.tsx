import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail } from "lucide-react"

export interface TeamMember {
    id: string
    name: string
    role: string
    email: string
    course: string;
    startup_profile_id: string;
  }

interface TeamMemberCardProps {
  member: TeamMember
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const isLeader = member.role === "CEO" || member.role === "Founder"

  return (
    <Card>
      <CardHeader className="py-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">{member.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                {member.role}
                {isLeader && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Leader
                  </Badge>
                )}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

