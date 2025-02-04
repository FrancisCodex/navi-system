interface Appointment {
  id: number
  studentName: string
  teacherName: string
  subject: string
  date: Date
  status: string
}

const appointments: Appointment[] = [
  {
    id: 1,
    studentName: "John Doe",
    teacherName: "Ms. Smith",
    subject: "Math",
    date: new Date(2025, 1, 20),
    status: "pending",
  },
  {
    id: 2,
    studentName: "Jane Smith",
    teacherName: "Mr. Johnson",
    subject: "English",
    date: new Date(2025, 1, 23),
    status: "accepted",
  },
  {
    id: 3,
    studentName: "Bob Brown",
    teacherName: "Dr. Wilson",
    subject: "Physics",
    date: new Date(2025, 1, 25),
    status: "pending",
  },
    {
        id: 4,
        studentName: "Alice Green",
        teacherName: "Prof. Lee",
        subject: "Chemistry",
        date: new Date(2025, 1, 25),
        status: "accepted",
    },
    {
        id: 5,
        studentName: "Eve White",
        teacherName: "Ms. Davis",
        subject: "Biology",
        date: new Date(2025, 1, 28),
        status: "declined",
    },

]

export default appointments