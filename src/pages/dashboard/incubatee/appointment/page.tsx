import { IncubateeMentorList } from "@/components/incubatees/mentor-cards"
import { useMentor } from "@/hooks/create-mentor"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyAppointments } from "@/components/incubatees/my-appointments"
import { LoaderCircle } from "lucide-react"
import { useAppointment } from "@/hooks/use-appointment"

interface Mentor {
  id: string
  firstName: string
  lastName: string
  organization: string
  expertise: string
  yearsOfExperience: number
  email: string
  image?: string
}

const SetAppointments = () => {
  const { mentors, loading: mentorsLoading, error, viewAllMentors } = useMentor()
  const { appointments, fetchAppointments, cancelAppointment, loading: appointmentsLoading } = useAppointment()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    viewAllMentors()
    fetchAppointments()
  }, [viewAllMentors, fetchAppointments])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await viewAllMentors()
    await fetchAppointments()
    setIsRefreshing(false)
  }


  const handleBookingSuccess = async () => {
    await fetchAppointments() // Fetch updated appointments after booking
  }

  if ((mentorsLoading || appointmentsLoading) && !isRefreshing) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    )
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment with a Mentor</h1>
      <Tabs defaultValue="book">
        <TabsList>
          <TabsTrigger value="book">Set Appointments</TabsTrigger>
          <TabsTrigger value="my-appointments">My Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="book">
          <div className="flex-col space-y-4">
            {mentors && mentors.map((mentor: Mentor) => (
              <IncubateeMentorList key={mentor.id} mentor={mentor} onBookingSuccess={handleBookingSuccess} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="my-appointments">
          <MyAppointments appointments={appointments} onCancelAppointment={cancelAppointment} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SetAppointments