import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppointment } from "@/hooks/use-appointment"
import { format } from "date-fns"

interface Mentor {
  id: string
  firstName: string
  lastName: string
  expertise: string
}

interface AppointmentBookingProps {
  mentor: Mentor
  onCancel: () => void
}

export function AppointmentBooking({ mentor, onCancel }: AppointmentBookingProps) {
  const { createAppointment } = useAppointment()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [notes, setNotes] = useState("")

  const handleBookAppointment = async () => {
    if (selectedDate) {
      const appointmentData = {
        mentor_id: mentor.id,
        date: format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss.ssXXX"),
      }
      await createAppointment(appointmentData)
      onCancel()
    }
  }

  console.log(selectedDate)

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Appointment with {mentor.firstName} {mentor.lastName}</DialogTitle>
          <DialogDescription>
            Select a date for your appointment with {mentor.firstName} {mentor.lastName} for {mentor.expertise}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border justify-self-center" />
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information for your mentor"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleBookAppointment} disabled={!selectedDate}>
            Book Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}