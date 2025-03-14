import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppointmentBooking } from "./appointment-booking"
import type { Mentor } from "@/constants/types"

interface MentorCardProps {
  mentor: Mentor
  onBookingSuccess: () => void // Add this prop
}

export function IncubateeMentorList({ mentor, onBookingSuccess }: MentorCardProps): JSX.Element {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleOpenBooking = () => {
    setIsBookingOpen(true)
  }

  const handleCloseBooking = () => {
    setIsBookingOpen(false)
  }

  return (
    <>
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer hover:-translate-y-1.5 hover:transition">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{mentor.firstName[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <CardTitle>{mentor.firstName} {mentor.lastName}</CardTitle>
                <CardDescription>{mentor.organization}</CardDescription>
              </div>
            </div>
            <div>
              <div className="flex gap-2 flex-col md:flex-row justify-end items-center">
                <Button onClick={handleOpenBooking}>
                  <CalendarPlus /> <span className="hidden md:block">Set Appointment</span>
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expertise:</span>
              <span>{mentor.expertise}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Years of Experience:</span>
              <span>{mentor.yearsOfExperience}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{mentor.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      {isBookingOpen && (
        <AppointmentBooking mentor={mentor} onCancel={handleCloseBooking} onBookingSuccess={onBookingSuccess} />
      )}
    </>
  )
}