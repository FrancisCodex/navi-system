import { Calendar, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import type { Appointment } from "@/constants/types"

interface AppointmentsListProps {
  appointments: Appointment[]
}

export function AppointmentsList({ appointments }: AppointmentsListProps) {
  console.log(appointments)
  return (
    <Card className="col-span-1 flex flex-col">
      <CardHeader>
        <CardTitle>Recent Appointments</CardTitle>
        <CardDescription>Latest appointments made by startup group leaders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="rounded-md bg-primary/10 p-2">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{appointment.incubateeName}</p>
              <p className="text-sm text-muted-foreground">
                Meeting with {appointment.mentorName} ({appointment.mentor_expertise})
              </p>
              <div className="flex items-center pt-2">
                <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{new Date(appointment.date).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="mt-auto">
        <Link to="appointments" className="w-full">
          <Button variant="outline" className="w-full">
            View All Appointments
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}