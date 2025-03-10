import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, School, Pencil, Trash, Plus, LoaderCircle, RefreshCcw } from "lucide-react"
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
import { useMentor } from "@/hooks/create-mentor"

interface Mentor {
  id: string
  firstName: string
  lastName: string
  organization: string
  expertise: string
  yearsOfExperience: number
  email: string
  image?: string
}

const MentorsList = () => {
  const { mentors, loading, error, viewAllMentors } = useMentor()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    viewAllMentors()
    console.log(mentors)
  }, [viewAllMentors])

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    viewAllMentors() // Refresh the mentor list
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await viewAllMentors()
    setIsRefreshing(false)
  }

  if (loading && !isRefreshing) {
    return <div className="flex justify-center items-center h-64">
      <LoaderCircle className="animate-spin h-6 w-6" />
    </div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }


  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">Incubatee Mentors</h1>
            <Button variant="ghost" onClick={handleRefresh}>
              <RefreshCcw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          {/* Dialog Add Mentor */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
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
              <MentorsForm onSuccess={handleDialogClose} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mentors && mentors.map((mentor: Mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MentorsList