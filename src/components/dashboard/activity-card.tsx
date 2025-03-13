import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Link } from "react-router-dom"

interface Activity {
  id: string;
  activity_name: string;
  module: string;
  session: string;
  activity_description: string;
  speaker_name: string;
  TBI: string;
  due_date: string;
  file?: File;
  progress: number;
  total_incubatees: number;
  total_submissions: number;
}

interface ActivityCardProps {
  activities: Activity[]
}

export function ActivityCard({ activities }: ActivityCardProps) {
  return (
    <Card className="col-span-1 flex flex-col">
      <CardHeader>
        <CardTitle>Activity Milestones</CardTitle>
        <CardDescription>Progress of startup groups completing required activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        {activities.map((activity, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium">{activity.activity_name}</p>
                <p className="text-xs text-muted-foreground">Module {activity.module}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                Deadline: {new Date(activity.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <Progress value={activity.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {activity.total_submissions}/{activity.total_incubatees} groups completed
            </p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild variant="outline" className="w-full">
          <Link to="activities">
            View All Activities
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}