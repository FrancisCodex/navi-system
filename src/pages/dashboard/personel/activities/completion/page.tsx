import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

const mockCompletions = [
  {
    id: 1,
    name: "John Doe",
    completedSubmissions: 8,
    totalSubmissions: 10,
  },
    {
        id: 2,
        name: "Jane Doe",
        completedSubmissions: 6,
        totalSubmissions: 10,
    },
    {
        id: 3,
        name: "John Smith",
        completedSubmissions: 5,
        totalSubmissions: 10,
    },
  // Add more mock data as needed
]

export default function CompletionPage() {
  const [completions, setCompletions] = useState(mockCompletions)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompletions = completions.filter((completion) =>
    completion.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-bold">Submission Completion</h1>
      <Input
        placeholder="Search by incubatee name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Incubatee Name</TableHead>
            <TableHead>Completed Submissions</TableHead>
            <TableHead>Total Submissions</TableHead>
            <TableHead>Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompletions.map((completion) => (
            <TableRow key={completion.id}>
              <TableCell>{completion.name}</TableCell>
              <TableCell>{completion.completedSubmissions}</TableCell>
              <TableCell>{completion.totalSubmissions}</TableCell>
              <TableCell>
                <Progress
                  value={(completion.completedSubmissions / completion.totalSubmissions) * 100}
                  className="w-[60%]"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

