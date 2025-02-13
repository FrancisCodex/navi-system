import { Badge } from "@/components/ui/badge"
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

interface Appointment {
    id: string;
    mentor_id: string;
    incubateeName?: string;
    mentorName?: string;
    date: string;
    requestedAt?: Date;
    status?: "pending" | "accepted" | "declined" | "completed" | "cancelled";
}

interface MyAppointmentsProps {
  appointments: Appointment[]
  onCancelAppointment: (id: string) => void
}

export function MyAppointments({ appointments, onCancelAppointment }: MyAppointmentsProps) {
  const pendingAppointments = appointments.filter((app) => app.status === "pending" || app.status === "accepted")
  const pastAppointments = appointments.filter((app) => app.status === "completed" || app.status === "cancelled")

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
            <TableCell>{appointment.mentor_id}</TableCell>
            <TableCell>{new Date(appointment.date).toLocaleString()}</TableCell>
            <TableCell>
              <Badge>
                {appointment.status}
              </Badge>
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