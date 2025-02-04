import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import {Badge} from "@/components/ui/badge"
interface Appointment {
  id: number
  studentName: string
  teacherName: string
  subject: string
  date: Date
  status: string
}

interface AppointmentListProps {
  appointments: Appointment[]
  onAcceptAppointment: (id: number) => void
  onDeclineAppointment: (id: number) => void
  onSendEmail: (teacherName: string) => void
}

export function AppointmentList({
  appointments,
  onAcceptAppointment,
  onDeclineAppointment,
  onSendEmail,
}: AppointmentListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-500 text-white">Accepted</Badge>
      case "declined":
        return <Badge className="bg-red-500 text-white">Declined</Badge>
      case "pending":
      default:
        return <Badge className="bg-muted-foreground text-white">Pending</Badge>
    }
  }
  
  return (
    <div className="rounded-lg border max-w-[92vw] md:max-w-[100vw] overflow-x-auto">
    <Table className="min-w-[800px] bg-card">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Student</TableHead>
          <TableHead className="text-center">Teacher</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id} className="text-center">
            <TableCell>{appointment.studentName}</TableCell>
            <TableCell>{appointment.teacherName}</TableCell>
            <TableCell>{appointment.subject}</TableCell>
            <TableCell>{appointment.date.toLocaleDateString()}</TableCell>
            <TableCell>{getStatusBadge(appointment.status)}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>View Details</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Appointment Details</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p>
                      <strong>Student:</strong> {appointment.studentName}
                    </p>
                    <p>
                      <strong>Teacher:</strong> {appointment.teacherName}
                    </p>
                    <p>
                      <strong>Date:</strong> {appointment.date.toLocaleString()}
                    </p>
                    <p>
                      <strong>Status:</strong> {appointment.status}
                    </p>
                  </div>
                  <DialogFooter>
                    {appointment.status === "pending" && (
                      <>
                        <Button onClick={() => onAcceptAppointment(appointment.id)} className="bg-green-500 hover:bg-green-400">Accept</Button>
                        <Button variant="destructive" onClick={() => onDeclineAppointment(appointment.id)}>
                          Decline
                        </Button>
                      </>
                    )}
                    <Button onClick={() => onSendEmail(appointment.teacherName)}>Notify Teacher</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>

  )
}

