
import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, FileText, Download, ExternalLink, Plus } from "lucide-react"
import { Link } from "react-router-dom"

interface Activity {
    submission_id: number;
    activity_id: number;
    activity_name: string;
    module: string;
    TBI: string;
    due_date: string;
    submitted_at: string;
    graded: boolean;
    submission_file: string;
    leader_name: string;
  }
interface ActivityListProps {
  activities: Activity[]
}

export function SubmittedActivityList({ activities }: ActivityListProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [filter, setFilter] = useState<string>("all")

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM d, yyyy 'at' h:mm a")
  }

  // Get badge variant based on graded status
  const getStatusBadge = (graded: boolean) => {
    return graded ? "success" : "default"
  }

  // Filter activities
  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((activity) => (filter === "graded" ? activity.graded : !activity.graded))

  // Sort activities by submission date (newest first)
  const sortedActivities = [...filteredActivities].sort(
    (a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime(),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Team Activities</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        <Tabs defaultValue="all" className="w-auto" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
            <TabsTrigger value="not_graded">Not Graded</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {sortedActivities.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <div className="text-muted-foreground mb-2">No activities found</div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sortedActivities.map((activity) => (
            <Card
              key={activity.submission_id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setSelectedActivity(activity)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{activity.activity_name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(activity.submitted_at)}</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getStatusBadge(activity.graded)}>{activity.graded ? "Graded" : "Not Graded"}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{activity.module}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{activity.leader_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    Submitted by <span className="font-medium">{activity.leader_name}</span>
                  </span>
                </div>
                {activity.submission_file && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <FileText className="h-3 w-3" />
                    <span>1 attachment</span>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Activity Detail Dialog */}
      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        {selectedActivity && (
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto">
            <DialogHeader className="pt-4">
              <div className="flex items-center justify-between">
                <DialogTitle>{selectedActivity.activity_name}</DialogTitle>
                <div className="flex gap-2">
                  <Badge variant={getStatusBadge(selectedActivity.graded)}>{selectedActivity.graded ? "Graded" : "Not Graded"}</Badge>
                </div>
              </div>
              <DialogDescription className="flex items-center gap-2 pt-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(selectedActivity.submitted_at)}</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2">Module</h4>
                <p className="text-sm text-muted-foreground">{selectedActivity.module}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2">Submitted By</h4>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{selectedActivity.leader_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedActivity.leader_name}</div>
                  </div>
                </div>
              </div>

              {selectedActivity.submission_file && (
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-3">Attachment</h4>
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-primary/10 p-2">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{selectedActivity.submission_file.split('/').pop()}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                    <Link to={`/dashboard/activities/submissions/grade/${selectedActivity.submission_id}`}>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Activity date: {formatDate(selectedActivity.submitted_at)}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}