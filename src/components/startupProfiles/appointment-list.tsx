import { useState } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/hooks/use-toast"
import { Calendar, Clock, MoreHorizontal } from "lucide-react"

export interface Appointment {
  id: string
  date: string
  requestedAt: string
  mentorName: string
  status: "pending" | "accepted" | "declined" | "completed" | "cancelled"
}

interface AppointmentListProps {
  appointments: Appointment[]
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [updatedAppointments, setUpdatedAppointments] = useState<Appointment[]>(appointments)

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM d, yyyy 'at' h:mm a")
  }

  // Get badge variant based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "accepted":
        return "default"
      case "cancelled":
        return "destructive"
      case "pending":
        return "warning"
      case "declined":
        return "secondary"
      default:
        return "secondary"
    }
  }

  // Handle status change
  const handleStatusChange = (newStatus: "pending" | "accepted" | "declined" | "completed" | "cancelled") => {
    if (selectedAppointment) {
      // Update the appointment status
      const updatedAppointmentList = updatedAppointments.map((appointment) =>
        appointment.id === selectedAppointment.id ? { ...appointment, status: newStatus } : appointment,
      )

      setUpdatedAppointments(updatedAppointmentList)

      // Show success toast
      toast({
        title: "Status updated",
        description: `Appointment with ${selectedAppointment.mentorName} is now ${newStatus}`,
      })

      // Close the dialog
      setIsStatusDialogOpen(false)
      setSelectedAppointment(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Mentor Appointments</h3>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule New
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentor</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {updatedAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                  No appointments scheduled
                </TableCell>
              </TableRow>
            ) : (
              updatedAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{appointment.mentorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{appointment.mentorName}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{formatDate(appointment.requestedAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(appointment.status) as any}>{appointment.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedAppointment(appointment)
                            setIsStatusDialogOpen(true)
                          }}
                        >
                          Change Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Status Change Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Appointment Status</DialogTitle>
            <DialogDescription>
              Update the status for the appointment with {selectedAppointment?.mentorName}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Current Status</h4>
              <Badge
                variant={selectedAppointment ? (getStatusBadge(selectedAppointment.status) as any) : "secondary"}
                className="text-xs"
              >
                {selectedAppointment?.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Change to</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("accepted")}
                  disabled={selectedAppointment?.status === "accepted"}
                >
                  Accepted
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("completed")}
                  disabled={selectedAppointment?.status === "completed"}
                >
                  Completed
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("cancelled")}
                  disabled={selectedAppointment?.status === "cancelled"}
                >
                  Cancelled
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("pending")}
                  disabled={selectedAppointment?.status === "pending"}
                >
                  Pending
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange("declined")}
                  disabled={selectedAppointment?.status === "declined"}
                >
                  Declined
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}