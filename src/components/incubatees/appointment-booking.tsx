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
import type { Mentor } from "@/constants/types"

interface AppointmentBookingProps {
  mentor: Mentor
  onCancel: () => void
  onBookingSuccess: () => void
}

export function AppointmentBooking({ mentor, onCancel, onBookingSuccess }: AppointmentBookingProps) {
  const { createAppointment, loading } = useAppointment()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [notes, setNotes] = useState("")
  const handleBookAppointment = async () => {
    if (selectedDate) {
      const appointmentData = {
        mentor_id: mentor.id,
        date: format(selectedDate, "yyyy-MM-dd'T'HH:mm:ss.ssXXX"),
        notes,
      }
      await createAppointment(appointmentData)
      onBookingSuccess()
      onCancel()
    }
  }

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
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={(date) => date < new Date()} className="rounded-md border justify-self-center" />
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
          <Button onClick={handleBookAppointment} disabled={!selectedDate || loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}