import { useState, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Upload } from "lucide-react"

interface Action {
  id: number
  module: string
  session: string
  activityName: string
  speaker: string
  tbi: string
  file: File | null
}

// Mock data for incubatee actions
const mockActions: Action[] = [
  {
    id: 1,
    module: "Module 1",
    session: "Session 1",
    activityName: "Activity 1",
    speaker: "John Doe",
    tbi: "Navigatu",
    file: null,
  },
  {
    id: 2,
    module: "Module 2",
    session: "Session 2",
    activityName: "Activity 2",
    speaker: "Jane Smith",
    tbi: "Tara",
    file: null,
  },
]

export default function IncubateeDashboardPage() {
  const [actions, setActions] = useState<Action[]>(mockActions)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedActionId, setSelectedActionId] = useState<number | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileUpload = (actionId: number, file: File) => {
    setActions(actions.map((action) => (action.id === actionId ? { ...action, file: file } : action)))
    toast.success('Login successful');
  }

  const filteredActions = actions.filter(
    (action) =>
      action.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.session.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.speaker.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4 p-8">
      <h1 className="text-3xl font-bold">Incubatee Dashboard</h1>
      <Input
        placeholder="Search by Module, Session, or Speaker..."
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Module</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Activity Name</TableHead>
            <TableHead>Speaker</TableHead>
            <TableHead>TBI</TableHead>
            <TableHead>File</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredActions.map((action) => (
            <TableRow key={action.id}>
              <TableCell>{action.module}</TableCell>
              <TableCell>{action.session}</TableCell>
              <TableCell>{action.activityName}</TableCell>
              <TableCell>{action.speaker}</TableCell>
              <TableCell>{action.tbi}</TableCell>
              <TableCell>
                {action.file ? (
                  <span className="text-sm text-muted-foreground">{action.file.name}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">No file</span>
                )}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => setSelectedActionId(action.id)}
                    >
                      <Upload className="h-4 w-4" />
                      {action.file ? "Change File" : "Attach File"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload File</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="file">Select File</Label>
                        <Input
                          id="file"
                          type="file"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setSelectedFile(file)
                            }
                          }}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Supported file types: PDF, DOC, DOCX, XLS, XLSX
                      </div>
                      <div className="flex justify-end space-x-2">
                        <DialogClose asChild>
                          <Button variant="outline" onClick={() => setSelectedFile(null)}>
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          onClick={() => {
                            if (selectedFile && selectedActionId !== null) {
                              handleFileUpload(selectedActionId, selectedFile)
                              setSelectedFile(null)
                            }
                          }}
                          disabled={!selectedFile}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}