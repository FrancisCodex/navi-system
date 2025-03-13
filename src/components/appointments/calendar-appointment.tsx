import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface Appointment {
  id: string
  incubateeName?: string
  mentorName?: string
  mentor_expertise?: string
  date: string
  requestedAt?: string
  status?: "pending" | "accepted" | "declined" | "completed" | "cancelled"
}

interface CalendarAppointmentProps {
  appointments: Appointment[]
}

export default function CalendarAppointment({ appointments }: CalendarAppointmentProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const renderCalendarDays = () => {
    const days = []
    const today = new Date()

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<TableCell key={`empty-${i}`} className="h-16 w-16 align-top p-1 border" />)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const appointmentsOnDate = appointments.filter((a) => new Date(a.date).toDateString() === date.toDateString())
      const hasAppointments = appointmentsOnDate.length > 0
      const isPastDate = date < today
      const allAppointmentsCancelledOrCompleted = appointmentsOnDate.every(
        (a) => a.status === "cancelled" || a.status === "completed"
      )

      days.push(
        <TableCell key={day} className="h-16 w-16 align-top p-1 border">
          {isPastDate ? (
            <div className="h-full w-full flex items-center justify-center">
              <Button
                variant="ghost"
                className="w-10 md:w-full h-full flex flex-col items-center justify-center"
                disabled
              >
                <span className="font-semibold">{day}</span>
              </Button>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <div className="h-full w-full flex items-center justify-center">
                  <Button
                    variant={hasAppointments && !allAppointmentsCancelledOrCompleted ? "default" : "ghost"}
                    className={`w-10 md:w-full h-full flex flex-col items-center justify-center ${hasAppointments && !allAppointmentsCancelledOrCompleted ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <span className="font-semibold">{day}</span>
                    {hasAppointments && !allAppointmentsCancelledOrCompleted && <span className="text-xs">View</span>}
                  </Button>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Appointments for {date.toDateString()}</DialogTitle>
                </DialogHeader>
                {appointmentsOnDate.length > 0 ? (
                  appointmentsOnDate.map((appointment) => (
                    <div key={appointment.id} className="p-2 border-b">
                      <p>
                        <strong>Incubatee:</strong> {appointment.incubateeName}
                      </p>
                      <p>
                        <strong>Mentor:</strong> {appointment.mentorName}
                      </p>
                      <p>
                        <strong>Status: </strong>
                        <Badge>{appointment.status}</Badge>
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No appointments on this day</p>
                )}
              </DialogContent>
            </Dialog>
          )}
        </TableCell>,
      )
    }
    return days
  }

  const renderCalendarWeeks = () => {
    const weeks = []
    const days = renderCalendarDays()
    while (days.length) {
      weeks.push(<TableRow key={weeks.length}>{days.splice(0, 7)}</TableRow>)
    }
    return weeks
  }

  return (
    <div className="flex flex-col h-full">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={handlePreviousMonth}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button variant="ghost" onClick={handleNextMonth}>
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Sun</TableHead>
              <TableHead className="text-center">Mon</TableHead>
              <TableHead className="text-center">Tue</TableHead>
              <TableHead className="text-center">Wed</TableHead>
              <TableHead className="text-center">Thu</TableHead>
              <TableHead className="text-center">Fri</TableHead>
              <TableHead className="text-center">Sat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderCalendarWeeks()}</TableBody>
        </Table>
      </div>
    </div>
  )
}