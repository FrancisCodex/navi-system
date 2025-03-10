import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, BookOpenIcon, UserIcon, FileTextIcon, LoaderCircle } from "lucide-react"
import { useActivities } from '@/hooks/use-activities';
import { useSubmission } from "@/hooks/use-submission"

interface Activity {
  id: string;
  activity_name: string;
  module: string;
  session: string;
  activity_description: string;
  speaker_name: string;
  TBI: string;
  due_date: Date;
  file?: File;
  submitted?: boolean;
}

const ActivitiesIncubatee: React.FC = () => {
  const { activities, loading, error, viewAllActivities } = useActivities();
  const { checkUserSubmission } = useSubmission();
  const [sortedActivities, setSortedActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      await viewAllActivities();
    };
    fetchActivities();
  }, [viewAllActivities]);

  useEffect(() => {
    const fetchSubmissionStatus = async () => {
      const activitiesWithStatus = await Promise.all(
        activities.map(async (activity) => {
          const submissionStatus = await checkUserSubmission(activity.id);
          return {
            ...activity,
            submitted: submissionStatus?.submitted || false,
          };
        })
      );

      // Sort activities: not submitted first, then submitted
      const sorted = activitiesWithStatus.sort((a, b) => Number(a.submitted) - Number(b.submitted));
      setSortedActivities(sorted);
    };

    if (activities.length > 0) {
      fetchSubmissionStatus();
    }
  }, [activities, checkUserSubmission]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (activities.length === 0) {
    return (
      <div className="p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Activities</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <h1 className="text-2xl text-center text-gray-500">No activities available</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Activities</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedActivities.map((activity) => (
          <Link
            to={`/incubatees/activities/${activity.id}`}
            key={activity.id}
            className="block transition-transform hover:scale-[1.02]"
          >
            <Card className={`h-full ${activity.submitted ? 'bg-gray-200' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{activity.activity_name}</CardTitle>
                  <Badge variant={activity.submitted ? "default" : "destructive"}>
                    {activity.submitted ? "Submitted" : "Pending"}
                  </Badge>
                </div>
                <CardDescription>
                  {activity.module} • {activity.session}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{activity.activity_description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{activity.speaker_name}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpenIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{activity.TBI}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Due: {new Date(activity.due_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">
                  <FileTextIcon className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesIncubatee;