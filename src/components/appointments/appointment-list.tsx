import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Search } from "lucide-react"

interface Appointment {
  id: string
  mentor_id: string
  incubateeName?: string
  mentorName?: string
  date: string
  requestedAt?: Date
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

export function AppointmentList({
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

  console.log(filteredAndSortedAppointments)
  const statusBadgeColor = (status: Appointment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-muted text-muted-foreground"
      case "accepted":
        return "bg-green-500 text-white"
      case "declined":
        return "bg-destructive text-destructive-foreground"
      case "completed":
        return "bg-blue-500 text-white"
      case "cancelled":
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
        <div className="md:grid md:grid-cols-2 lg:flex gap-2 pb-4 md:pb-0 w-fit">
          <Button onClick={() => setFilter("all")} variant={filter === "all" ? "default" : "outline"}>
            All
          </Button>
          <Button onClick={() => setFilter("pending")} variant={filter === "pending" ? "default" : "outline"}>
            Pending
          </Button>
          <Button onClick={() => setFilter("accepted")} variant={filter === "accepted" ? "default" : "outline"}>
            Accepted
          </Button>
          <Button onClick={() => setFilter("declined")} variant={filter === "declined" ? "default" : "outline"}>
            Declined
          </Button>
          <Button onClick={() => setFilter("completed")} variant={filter === "completed" ? "default" : "outline"}>
            Completed
          </Button>
        </div>
        <div className="relative justify-end">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Mentor or Incubatee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 pl-8"
          />
        </div>
      </div>
      <div className="border rounded-lg overflow-x-auto max-w-[100vw]">
        <Table className="min-w-[600px] bg-card">
          <TableHeader>
            <TableRow>
              <TableHead>Incubatee</TableHead>
              <TableHead>Mentor</TableHead>
              <TableHead>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-full justify-start">
                      Date <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("appointment_date")
                        setSortOrder("asc")
                      }}
                    >
                      Oldest First
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("appointment_date")
                        setSortOrder("desc")
                      }}
                    >
                      Newest First
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-full justify-start">
                      Requested At <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("requestedAt")
                        setSortOrder("asc")
                      }}
                    >
                      Oldest Request
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortBy("requestedAt")
                        setSortOrder("desc")
                      }}
                    >
                      Newest Request
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedAppointments.map((appointment) => (
              <TableRow key={appointment.id} className={appointment.status === "completed" ? "line-through" : ""}>
                <TableCell>{appointment.incubateeName}</TableCell>
                <TableCell>{appointment.mentorName}</TableCell>
                <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={statusBadgeColor(appointment.status)}>{appointment.status}</Badge>
                </TableCell>
                <TableCell>{appointment.requestedAt?.toLocaleString()}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Details</Button>
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
                          <strong>Date:</strong> {new Date(appointment.date).toLocaleString()}
                        </p>
                        <p>
                          <strong>Status:</strong> {appointment.status}
                        </p>
                        <p>
                          <strong>Requested At:</strong> {appointment.requestedAt?.toLocaleString()}
                        </p>
                      </div>
                      <DialogFooter>
                        {appointment.status === "pending" && (
                          <>
                            <Button onClick={() => onAcceptAppointment(appointment.id)}>Accept</Button>
                            <Button variant="destructive" onClick={() => onDeclineAppointment(appointment.id)}>
                              Decline
                            </Button>
                          </>
                        )}
                        {appointment.status === "accepted" && (
                          <Button onClick={() => onCompleteAppointment(appointment.id)}>Mark as Completed</Button>
                        )}
                        {appointment.status === "completed" && (
                          <Button variant="destructive" onClick={() => onDeleteAppointment(appointment.id)}>
                            Delete
                          </Button>
                        )}
                        <Button onClick={() => onSendEmail(appointment.mentorName!)}>Notify Mentor</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}