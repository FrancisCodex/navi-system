import { Calendar, Clock } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// This would come from your database
const appointments = [
  {
    id: 1,
    teacher: {
      name: "Dr. Smith",
      subject: "Company 1",
      image: "/placeholder.svg?height=40&width=40",
    },
    status: "upcoming",
    date: "Feb 5, 2024",
    time: "2:00 PM",
  },
  {
    id: 2,
    teacher: {
      name: "Mrs. Davis",
      subject: "Company 2",
      image: "/placeholder.svg?height=40&width=40",
    },
    status: "completed",
    date: "Jan 30, 2024",
    time: "3:30 PM",
  },
  {
    id: 3,
    teacher: {
      name: "Mr. Anderson",
      subject: "Company 3",
      image: "/placeholder.svg?height=40&width=40",
    },
    status: "cancelled",
    date: "Jan 28, 2024",
    time: "1:00 PM",
  },
]

interface TeamAppointmentsProps {
  teamId: number
}

export function TeamAppointments({ teamId }: TeamAppointmentsProps) {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center justify-between space-x-4 rounded-lg border p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={appointment.teacher.image} />
              <AvatarFallback>{appointment.teacher.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{appointment.teacher.name}</p>
              <p className="text-sm text-muted-foreground">{appointment.teacher.subject}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-right">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.time}</span>
              </div>
            </div>
            <Badge
              variant={
                appointment.status === "upcoming"
                  ? "default"
                  : appointment.status === "completed"
                    ? "secondary"
                    : "destructive"
              }
            >
              {appointment.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

