import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AppointmentCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="">
      <div className="rounded-md border w-fit">
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
      </div>
    </div>
  )
}
