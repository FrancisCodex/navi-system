import { ArrowLeft, Calendar, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamAppointments } from "@/components/team-appointments"
import { TeamMembers } from "@/components/team-members"

// This would come from your database
const team = {
  id: 1,
  name: "Team Alpha",
  project: "Mathematics Research Group",
  description: "Advanced mathematics research and problem-solving group",
  leader: {
    name: "John Smith",
    role: "Team Leader",
    grade: "12th Grade",
    image: "/placeholder.svg?height=40&width=40",
  },
  advisor: {
    name: "Dr. Smith",
    subject: "Mathematics",
    image: "/placeholder.svg?height=40&width=40",
  },
  members: [
    {
      id: 1,
      name: "John Smith",
      role: "Leader",
      grade: "12th Grade",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Member",
      grade: "12th Grade",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Member",
      grade: "11th Grade",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Member",
      grade: "11th Grade",
      image: "/placeholder.svg?height=40&width=40",
    },
  ],
}

export default function TeamPage() {
  if (!team) {
    <div>
        <h1>
            No Team team
        </h1>
    </div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard/incubatees">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">{team.name}</h1>
            <Badge variant="secondary">{team.project}</Badge>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Team Leader</CardTitle>
              <CardDescription>Team leader and main contact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={team.leader.image} />
                  <AvatarFallback>{team.leader.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{team.leader.name}</p>
                  <p className="text-sm text-muted-foreground">{team.leader.grade}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Teacher Advisor</CardTitle>
              <CardDescription>Supervising teacher</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={team.advisor.image} />
                  <AvatarFallback>{team.advisor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{team.advisor.name}</p>
                  <p className="text-sm text-muted-foreground">{team.advisor.subject}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team Size</CardTitle>
              <CardDescription>Total number of members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Users className="h-8 w-8 text-muted-foreground" />
                <div className="text-2xl font-bold">{team.members.length}</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Team Details</CardTitle>
            <CardDescription>{team.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="members">
              <TabsList>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
              </TabsList>
              <TabsContent value="members" className="mt-4">
                <TeamMembers members={team.members} />
              </TabsContent>
              <TabsContent value="appointments" className="mt-4">
                <TeamAppointments teamId={team.id} />
              </TabsContent>
              <TabsContent value="documents" className="mt-4">
                <h1>Documents</h1>
              </TabsContent>
              <TabsContent value="submissions" className="mt-4">
                <h1>Submissions</h1>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

