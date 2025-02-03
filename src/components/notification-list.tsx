import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const notifications = [
  {
    id: 1,
    studentName: "Alice Johnson",
    teacherName: "Dr. Smith",
    subject: "Mathematics",
    time: "10:00 AM",
    date: "Tomorrow",
    studentImage: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    studentName: "Bob Wilson",
    teacherName: "Mrs. Davis",
    subject: "English",
    time: "2:30 PM",
    date: "Today",
    studentImage: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    studentName: "Carol Brown",
    teacherName: "Mr. Anderson",
    subject: "Physics",
    time: "11:15 AM",
    date: "Today",
    studentImage: "/placeholder.svg?height=32&width=32",
  },
]

export function NotificationList() {
  return (
    <div className=" divide-y divide-gray-200">
      {notifications.map((notification) => (
        <div key={notification.id} className="flex items-center justify-between space-x-4 py-2">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={notification.studentImage} />
              <AvatarFallback>{notification.studentName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{notification.studentName}</p>
              <p className="text-sm text-muted-foreground">
                Requested {notification.subject} with {notification.teacherName}
              </p>
              <p className="text-xs text-muted-foreground">
                {notification.time} - {notification.date}
              </p>
            </div>
          </div>
          <div className="flex gap-2 md:flex-row flex-col">
            <Button variant="destructive" size="sm">
              Decline
            </Button>
            <Button size="sm">Accept</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

