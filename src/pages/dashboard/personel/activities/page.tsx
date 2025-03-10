import { ActivityList } from "@/components/activity-list"
import { LoaderCircle, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useActivities } from '@/hooks/use-activities';
import ActivityForm from "@/components/add-activity-form"

const Activities = () => {
  const { activities, loading, error, viewAllActivities, createActivity } = useActivities();
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    viewAllActivities();
  }, [viewAllActivities]);

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    viewAllActivities() // Refresh the activities list
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    );
  }

  console.log(activities)

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-10">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex justify-between items-center mb-8"> 
          <h1 className="text-3xl font-bold">
            All Activities
          </h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Activity</DialogTitle>
              <DialogDescription>
                Add a new activity for Incubatees to answer
              </DialogDescription>
            </DialogHeader>
            <ActivityForm onSuccess={handleDialogClose}/>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <ActivityList activities={activities} />
      </div>
    </div>
  )
}

export default Activities