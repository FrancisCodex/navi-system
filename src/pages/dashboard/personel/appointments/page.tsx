import CalendarAppointment from "@/components/appointments/calendar-appointment"
import { useEffect } from "react"
import { AddEventForm } from "@/components/add-event-form"
import { AppointmentList } from "@/components/appointments/appointment-list"
import { useAppointment } from "@/hooks/use-appointment"
import { LoaderCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AppointmentsListing } from "@/components/appointments/appointments";
import { Separator } from "@/components/ui/separator"


export default function Appointments() {
  const { appointments, fetchAppointments, updateAppointment, deleteAppointment, loading, error } = useAppointment()

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const handleAcceptAppointment = (id: string) => {
    updateAppointment(id, { status: "accepted" })
  }

  const handleDeclineAppointment = (id: string) => {
    updateAppointment(id, { status: "declined" })
  }

  const handleCompleteAppointment = (id: string) => {
    updateAppointment(id, { status: "completed" })
  }

  const handleDeleteAppointment = (id: string) => {
    deleteAppointment(id)
  }

  const handleSendEmail = (teacherName: string) => {
    // Implement email sending logic here
    console.log(`Sending email to ${teacherName}`)
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  console.log(appointments)

  return (
    <div className="p-4">
      <div className="grid grid-rows-1">
        <div>
          <CalendarAppointment appointments={appointments} />
        </div>
        <div>
          {/* <h1 className="text-2xl font-bold mb-4">Mentor Appointments</h1>
          <AppointmentList
            appointments={appointments}
            onAcceptAppointment={handleAcceptAppointment}
            onDeclineAppointment={handleDeclineAppointment}
            onCompleteAppointment={handleCompleteAppointment}
            onDeleteAppointment={handleDeleteAppointment}
            onSendEmail={handleSendEmail}
          /> */}
          <Card className="">
            <CardHeader className="flex flex-row justify-between">
              <div>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Recent appointment requests</CardDescription>
              </div>
            </CardHeader>
            <Separator/>
            <CardContent className="pt-5">
              <AppointmentsListing
                appointments={appointments}
                onAcceptAppointment={handleAcceptAppointment}
                onDeclineAppointment={handleDeclineAppointment}
                onCompleteAppointment={handleCompleteAppointment}
                onDeleteAppointment={handleDeleteAppointment}
                onSendEmail={handleSendEmail}
              />
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}