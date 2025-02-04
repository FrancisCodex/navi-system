import { Button } from "@/components/ui/button"
import mentors from "@/constants/mentors"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, School, Pencil, Trash, Plus } from "lucide-react"
import { MentorCard } from "@/components/mentor-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import MentorsForm from "@/components/MentorsAddForm"
const MentorsList = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <h1 className="text-lg font-semibold">Incubatee Mentors</h1>
          {/* Dialog Add Mentor */}
          <Dialog>
            <DialogTrigger>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Mentor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Mentor</DialogTitle>
                <DialogDescription>
                  Add a new mentor to the list of mentors
                </DialogDescription>
              </DialogHeader>
              <MentorsForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <MentorCard mentor={mentor} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MentorsList