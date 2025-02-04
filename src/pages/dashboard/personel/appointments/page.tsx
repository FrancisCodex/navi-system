import CalendarAppointment from "@/components/appointments/calendar-appointment"
import { useState } from "react"
import { AddEventForm } from "@/components/add-event-form"
import appointments from "@/constants/appointments"
import { AppointmentList } from "@/components/appointments/appointment-list"

interface Appointment {
  id: number
  studentName: string
  teacherName: string
  subject: string
  date: Date
  status: string
}

export default function Appointments() {
  const [appointment, setAppointments] = useState<Appointment[]>(appointments)

  const handleAcceptAppointment = (id: number) => {
    setAppointments(appointments.map((app) => (app.id === id ? { ...app, status: "accepted" } : app)))
  }

  const handleDeclineAppointment = (id: number) => {
    setAppointments(appointments.map((app) => (app.id === id ? { ...app, status: "declined" } : app)))
  }

  const handleSendEmail = (teacherName: string) => {
    // Implement email sending logic here
    console.log(`Sending email to ${teacherName}`)
  }
  console.log(appointment)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mentor Appointment Calendar</h1>
      <div className="grid grid-rows-1">
        <div>
          <CalendarAppointment appointments={appointment} />
        </div>
        <div>
          <AppointmentList appointments={appointment}
          onAcceptAppointment={handleAcceptAppointment}
          onDeclineAppointment={handleDeclineAppointment}
          onSendEmail={handleSendEmail}
        />
        </div>
      </div>
    </div>
  )
}