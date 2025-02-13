import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Submission {
  id: number
  module: string
  session: string
  activityName: string
  incubateeName: string
  status: string
}

const mockSubmissions: Submission[] = [
  {
    id: 1,
    module: "Module 1",
    session: "Session 1",
    activityName: "Activity 1",
    incubateeName: "John Doe",
    status: "Pending",
  },
    {
        id: 2,
        module: "Module 2",
        session: "Session 2",
        activityName: "Activity 2",
        incubateeName: "Jane Doe",
        status: "Pending",
        },
  // Add more mock data as needed
]

export default function SubmissionCheckingPage() {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions)
  const [searchTerm, setSearchTerm] = useState("")

  const handleStatusChange = (id: number, newStatus: Submission["status"]) => {
    setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub)))
  }

  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.incubateeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const statusBadgeColor = (status: Submission["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-muted text-muted-foreground"
      case "Approved":
        return "bg-green-500 text-white"
      case "Rejected":
        return "bg-destructive text-destructive-foreground"
    }
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-bold">Submission Checking</h1>
      <Input
        placeholder="Search by incubatee, module, or status..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Module</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Activity Name</TableHead>
            <TableHead>Incubatee Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubmissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>{submission.module}</TableCell>
              <TableCell>{submission.session}</TableCell>
              <TableCell>{submission.activityName}</TableCell>
              <TableCell>{submission.incubateeName}</TableCell>
              <TableCell>
                <Badge className={statusBadgeColor(submission.status)}>
                  {submission.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleStatusChange(submission.id, "Approved")}
                >
                  Approve
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleStatusChange(submission.id, "Rejected")}>
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}