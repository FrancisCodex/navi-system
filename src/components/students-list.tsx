import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    grade: "Startup 1",
    status: "Active",
    image: "/placeholder.svg?height=40&width=40", 
  },
  {
    id: 2,
    name: "Bob Wilson",
    grade: "Startup 2",
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Carol Brown",
    grade: "Startup 3",
    status: "Inactive",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Lee",
    grade: "Startup 4",
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function StudentsList() {
  return (
    <div className=" divide-y divide-gray-200"> 
      {students.map((student) => (
        <div key={student.id} className="flex items-center justify-between space-x-4 py-2">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={student.image} />
              <AvatarFallback>{student.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{student.name}</p>
              <p className="text-sm text-muted-foreground">{student.grade}</p>
            </div>
          </div>
          <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
        </div>
      ))}
    </div>
  )
}

