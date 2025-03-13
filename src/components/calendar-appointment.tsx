import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Event {
  id: number
  title: string
  description: string
  date: Date
}

export default function CalendarAppointment() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Math Tutoring",
      description: "Algebra review",
      date: new Date(2025, 5, 15),
    },
    {
      id: 2,
      title: "English Literature",
      description: "Discuss Shakespeare",
      date: new Date(2025, 5, 20),
    },
    {
      id: 3,
      title: "Physics Consultation",
      description: "Quantum mechanics",
      date: new Date(2025, 5, 25),
    },
    {
      id: 4,
      title: "Chemistry Lab",
      description: "Titration experiment",
      date: new Date(2025, 5, 25),
    },
    {
      id: 5,
      title: "Biology Lecture",
      description: "Evolutionary biology",
      date: new Date(2025, 5, 25),
    },
  ])
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const renderCalendarDays = () => {
    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<TableCell key={`empty-${i}`} className="h-24 align-top" />)
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const eventsOnDate = events.filter((e) => e.date.toDateString() === date.toDateString())
      days.push(
        <TableCell key={day} className="h-24 align-top p-2 border">
          <div className="font-semibold w-5 md:w-20 lg:w-32">{day}</div>
          {eventsOnDate.map((event) => (
            <div key={event.id} className="bg-primary w-fit text-wrap text-primary-foreground p-1 mt-1 text-xs rounded">
              {event.title}
            </div>
          ))}
        </TableCell>,
      )
    }
    return days
  }

  const renderCalendarWeeks = () => {
    const weeks = []
    const days = renderCalendarDays()
    while (days.length) {
      weeks.push(<TableRow key={weeks.length}>{days.splice(0, 7)}</TableRow>)
    }
    return weeks
  }

  return (
    <div className="flex flex-col h-full">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={handlePreviousMonth}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button variant="ghost" onClick={handleNextMonth}>
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Sun</TableHead>
              <TableHead className="text-center">Mon</TableHead>
              <TableHead className="text-center">Tue</TableHead>
              <TableHead className="text-center">Wed</TableHead>
              <TableHead className="text-center">Thu</TableHead>
              <TableHead className="text-center">Fri</TableHead>
              <TableHead className="text-center">Sat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderCalendarWeeks()}</TableBody>
        </Table>
      </div>
    </div>
  )
}

