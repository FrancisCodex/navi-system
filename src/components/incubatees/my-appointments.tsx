import { Badge } from "@/components/ui/badge"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAppointment } from "@/hooks/use-appointment"
import type { Appointment } from "@/constants/types"

interface MyAppointmentsProps {
  appointments: Appointment[]
  onCancelAppointment: (id: string) => void
}

export function MyAppointments({ appointments, onCancelAppointment }: MyAppointmentsProps) {
  const { fetchAppointments } = useAppointment()
  useEffect(() => {
    fetchAppointments()
  }, [appointments])
  const pendingAppointments = appointments.filter((app) => app.status === "pending" || app.status === "accepted")
  const pastAppointments = appointments.filter((app) => app.status === "completed" || app.status === "cancelled")
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
  const renderAppointmentTable = (apps: Appointment[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mentor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apps.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.mentorName}</TableCell>
            <TableCell>{new Date(appointment.date).toLocaleString()}</TableCell>
            <TableCell>
              <BadgeStatus status={appointment.status} />
            </TableCell>
            <TableCell>
              {(appointment.status === "pending" || appointment.status === "accepted") && (
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button variant="destructive">Cancel</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                        Are you sure you want to cancel this appointment?
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onCancelAppointment(appointment.id)}>
                            Confirm
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
        {pendingAppointments.length > 0 ? (
          renderAppointmentTable(pendingAppointments)
        ) : (
          <p>No upcoming appointments.</p>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Past Appointments</h2>
        {pastAppointments.length > 0 ? renderAppointmentTable(pastAppointments) : <p>No past appointments.</p>}
      </div>
    </div>
  )
}