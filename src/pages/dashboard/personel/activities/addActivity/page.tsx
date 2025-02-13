import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface Action {
    [key: string]: string
}

export default function AddActionPage() {
    const [actions, setActions] = useState<Action[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const { toast } = useToast()
  
    const handleAddAction = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const newAction = Object.fromEntries(formData.entries()) as Action
      setActions([...actions, newAction])
      toast({
        title: "Action added",
        description: "The new action has been added successfully.",
      })
      event.currentTarget.reset()
    }
  
    const filteredActions = actions.filter((action) =>
      Object.values(action).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())),
    )


  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-bold">Add Activities</h1>
      <div className="flex justify-between">
        <Input
          placeholder="Search actions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Action</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Action</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAction} className="space-y-4">
              <div>
                <Label htmlFor="module">Module</Label>
                <Input id="module" name="module" required />
              </div>
              <div>
                <Label htmlFor="session">Session</Label>
                <Input id="session" name="session" required />
              </div>
              <div>
                <Label htmlFor="activityName">Activity Name</Label>
                <Input id="activityName" name="activityName" required />
              </div>
              <div>
                <Label htmlFor="speaker">Speaker</Label>
                <Input id="speaker" name="speaker" required />
              </div>
              <div>
                <Label htmlFor="tbi">TBI</Label>
                <Input id="tbi" name="tbi" required />
              </div>
              <Button type="submit">Add Action</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Module</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Activity Name</TableHead>
            <TableHead>Speaker</TableHead>
            <TableHead>TBI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredActions.map((action, index) => (
            <TableRow key={index}>
              <TableCell>{action.module}</TableCell>
              <TableCell>{action.session}</TableCell>
              <TableCell>{action.activityName}</TableCell>
              <TableCell>{action.speaker}</TableCell>
              <TableCell>{action.tbi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}