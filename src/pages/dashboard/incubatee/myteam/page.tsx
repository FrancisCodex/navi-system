import { useEffect, useState } from "react"
import {
  Edit,
  Plus,
  LoaderCircle,
  Award
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { useNavigate } from "react-router-dom"
import { DocumentCardTabs } from "@/components/incubatees/myteam/document-card-tabs"
import { AchievementTabs } from "@/components/incubatees/myteam/achievement-card-tabs"
import { AddMemberForm } from "@/components/incubatees/myteam/addMemberForm"
import { EditStartupForm } from "@/components/incubatees/myteam/editStartupForm"

export default function MyStartup() {
  const { fetchStartupProfileIncubatee, loading } = useDashboardData()
  const [startupData, setStartupData] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStartupProfileIncubatee()
      setStartupData(data.startup_profile)
      setMembers(data.members)
      setAchievements(data.achievements)
      setAppointments(data.appointments)
      setDocuments(data.documents)
    }

    fetchData()
  }, [fetchStartupProfileIncubatee])

  if (loading || !startupData) {
    return <div className="flex justify-center items-center h-full">
      <LoaderCircle className="animate-spin h-6 w-6" />
    </div>
  }
  const handleNavigateAppointments = () => {
    navigate("/incubatees/appointments")
  }

  const handleAddMemberSuccess = () => {
    // Refresh the members list or perform other actions after adding a member
    window.location.reload()
  }

  const handleEditStartupSuccess = () => {
    // Refresh the startup details or perform other actions after editing the startup
    window.location.reload()
  }

  return (
    <div className="flex bg-background">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="grid gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">{startupData.startup_name}</h1>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger>
                  <Button variant="outline">
                  <Edit className="md:mr-2 h-4 w-4" />
                  <span className="hidden md:block">Edit Startup</span>
                  </Button>
                </DialogTrigger>
                
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Startup</DialogTitle>
                    <DialogDescription>Edit the details of the startup</DialogDescription>
                  </DialogHeader>
                    {/* Form to edit startup details */}
                    <EditStartupForm startupProfile={startupData.id} onSuccess={handleEditStartupSuccess}/>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <Button>
                    <Plus className="md:mr-2 h-4 w-4" />
                    <span className="hidden md:block">Add Member</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Member</DialogTitle>
                    <DialogDescription>Fill in the details to add a new member to the startup.</DialogDescription>
                  </DialogHeader>
                  <AddMemberForm startupProfileId={startupData.id} onSuccess={handleAddMemberSuccess} />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Startup Details */}
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium">Startup Information</h3>
                  <Separator className="my-2" />
                  <dl className="grid gap-2 text-sm">
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium text-muted-foreground">Industry:</dt>
                      <dd>{startupData.industry}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium text-muted-foreground">Founded:</dt>
                      <dd>{new Date(startupData.startup_founded).toLocaleDateString()}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="font-medium text-muted-foreground">Team Size:</dt>
                      <dd>{members.length} members</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-medium">About</h3>
                  <Separator className="my-2" />
                  <p className="text-sm text-muted-foreground">{startupData.startup_description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Team Members</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-medium">{member.name}</h3>
                        <Badge variant={member.role === "CEO" ? undefined : "outline"} className="text-sm">{member.role}</Badge>
                        <p className="text-xs">{member.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tabs for Achievements, Appointments, Documents */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Startup Profile</CardTitle>
                <CardDescription>Overview of your startup team</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
              <Tabs defaultValue="achievements" className="w-full">
                <TabsList className="grid w-fit grid-cols-3">
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                {/* Achievements Tab */}
                <TabsContent value="achievements" className="mt-4">
                  <AchievementTabs startupProfileId={startupData.id} achievements={achievements} />
                </TabsContent>

                {/* Appointments Tab */}
                <TabsContent value="appointments" className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Appointments</h2>
                    <Button size="sm" onClick={handleNavigateAppointments}>
                      <Plus className="mr-2 h-4 w-4" />
                      Schedule Appointment
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{appointment.mentorName}</h3>
                              <Badge variant={appointment.status === "completed" ? "secondary" : "outline"}>
                                {appointment.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Date: {new Date(appointment.date).toLocaleDateString()}</span>
                              <span>Time: {new Date(appointment.date).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="mt-4">
                  <DocumentCardTabs startupProfileId={startupData.id} documents={documents} />
                </TabsContent>
              </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}