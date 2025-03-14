import { ActivityList } from "@/components/activity-list";
import { LoaderCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useActivities } from '@/hooks/use-activities';
import ActivityForm from "@/components/add-activity-form";
import { DashboardHeader } from "@/components/dashboard-header";

const Activities = () => {
  const { activities, loading, error, viewAllActivities } = useActivities();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    viewAllActivities();
  }, [viewAllActivities]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    viewAllActivities(); // Refresh the activities list
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-10">
      <DashboardHeader heading="Activities" text="Manage all your activities in one place.">
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
            <ActivityForm onSuccess={handleDialogClose} />
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <div className="py-5">
        {activities.length === 0 ? (
          <div className="text-center text-muted-foreground">No Activities Assigned to Incubatees</div>
        ) : (
          <ActivityList activities={activities} />
        )}
      </div>
    </div>
  );
};

export default Activities;