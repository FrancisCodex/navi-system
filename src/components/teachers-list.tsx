import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const teachers = [
  {
    id: 1,
    name: "Dr. Smith",
    subject: "Mathematics",
    availability: "Available",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Mrs. Davis",
    subject: "English",
    availability: "In Session",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mr. Anderson",
    subject: "Physics",
    availability: "Available",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Ms. Wilson",
    subject: "Chemistry",
    availability: "Away",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function TeachersList() {
  return (
    <div className="space-y-4">
      {teachers.map((teacher) => (
        <div key={teacher.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={teacher.image} />
              <AvatarFallback>{teacher.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{teacher.name}</p>
              <p className="text-sm text-muted-foreground">{teacher.subject}</p>
            </div>
          </div>
          <Badge
            variant={
              teacher.availability === "Available"
                ? "default"
                : teacher.availability === "In Session"
                  ? "secondary"
                  : "outline"
            }
          >
            {teacher.availability}
          </Badge>
        </div>
      ))}
    </div>
  )
}

