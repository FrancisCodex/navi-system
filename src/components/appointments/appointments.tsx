import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

interface Appointment {
  id: string
  incubateeName?: string
  mentorName?: string
  mentor_expertise?: string
  date: string
  requestedAt?: string
  status?: "pending" | "accepted" | "declined" | "completed" | "cancelled"
}

interface AppointmentListProps {
  appointments: Appointment[]
  onAcceptAppointment: (id: string) => void
  onDeclineAppointment: (id: string) => void
  onCompleteAppointment: (id: string) => void
  onDeleteAppointment: (id: string) => void
  onSendEmail: (mentorName: string) => void
}

export function AppointmentsListing({
  appointments,
  onAcceptAppointment,
  onDeclineAppointment,
  onCompleteAppointment,
  onDeleteAppointment,
  onSendEmail,
}: AppointmentListProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "declined" | "completed">("all")
  const [sortBy, setSortBy] = useState<"appointment_date" | "requestedAt">("appointment_date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [search, setSearch] = useState("")

  const filteredAndSortedAppointments = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          (filter === "all" || appointment.status === filter) &&
          (appointment.incubateeName?.toLowerCase().includes(search.toLowerCase()) ||
            appointment.mentorName?.toLowerCase().includes(search.toLowerCase())),
      )
      .sort((a, b) => {
        if (sortBy === "appointment_date") {
          return sortOrder === "asc"
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        } else {
          return sortOrder === "asc"
            ? new Date(a.requestedAt!).getTime() - new Date(b.requestedAt!).getTime()
            : new Date(b.requestedAt!).getTime() - new Date(a.requestedAt!).getTime()
        }
      })
  }, [appointments, filter, sortBy, sortOrder, search])

  const BadgeStatus = ({ status }: { status: Appointment["status"] }) => {
    switch (status) {
      case "pending":
        return <Badge variant='outline' className="text-xs">Pending</Badge>
      case "accepted":
        return <Badge className="text-xs bg-green-500 hover:bg-green-600">Accepted</Badge>
      case "declined":
        return <Badge variant='destructive' className="text-xs">Declined</Badge>
      case "completed":
        return <Badge className="text-xs">Completed</Badge>
      case "cancelled":
        return <Badge variant='destructive' className="text-xs">Cancelled</Badge>
    }
  }

  return (
    <div className="divide-y divide-gray-200">
      {filteredAndSortedAppointments.map((appointment) => (
        <div key={appointment.id} className="grid grid-cols-3 space-x-4 py-2">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium leading-none">{appointment.incubateeName}</p>
              <p className="text-sm text-muted-foreground">
                Requested an appointment with {appointment.mentorName}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(appointment.date), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
          <div className='justify-self-center flex items-center'>
            <BadgeStatus status={appointment.status} />
          </div>

          <div className="flex gap-2 lg:flex-row flex-col justify-self-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='outline' size='sm'>
                  Actions
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Appointment Details</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>
                    <strong>Incubatee:</strong> {appointment.incubateeName}
                  </p>
                  <p>
                    <strong>Mentor:</strong> {appointment.mentorName}
                  </p>
                  <p>
                    <strong>Date:</strong> {format(new Date(appointment.date), 'MMMM d, yyyy')}
                  </p>
                  <p>
                    <strong>Status:</strong> {appointment.status}
                  </p>
                  <p>
                    <strong>Requested At:</strong> {appointment.requestedAt ? format(new Date(appointment.requestedAt), 'MMMM d, yyyy h:mm a') : 'N/A'}
                  </p>
                </div>
                <DialogFooter>
                  {appointment.status === "pending" && (
                    <>
                      <Button size='sm' onClick={() => onAcceptAppointment(appointment.id)}>
                        Accept
                      </Button>
                      <Button variant='destructive' size='sm' onClick={() => onDeclineAppointment(appointment.id)}>
                        Decline
                      </Button>
                    </>
                  )}
                  <Button variant='destructive' size='sm' onClick={() => onDeleteAppointment(appointment.id)}>
                    Delete
                  </Button>

                  {appointment.status === "accepted" && (
                    <Button size='sm' onClick={() => onCompleteAppointment(appointment.id)}>
                      Complete
                    </Button>
                  )}
                  <Button variant='outline' size='sm' onClick={() => onSendEmail(appointment.mentorName!)}>
                    Send Email
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  )
}