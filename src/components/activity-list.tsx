import { useState } from "react"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { Calendar, Edit, Eye, FileText, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import type { Activity } from "@/constants/types"

interface ActivityListProps {
  activities: Activity[];
}

export function ActivityList({ activities }: ActivityListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  console.log(activities)
  const handleDelete = async (id: string) => {
    setIsDeleting(id)

    try {
      // In a real app, you would call your API to delete the activity
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Activity deleted",
        description: "The activity has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "The activity could not be deleted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {activities.map((activity) => (
        <Card key={activity.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="line-clamp-1">{activity.activity_name}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/dashboard/activities/${activity.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/dashboard/activities/${activity.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/dashboard/activities/submissions/${activity.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Submissions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDelete(activity.id)}
                    disabled={isDeleting === activity.id}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    {isDeleting === activity.id ? "Deleting..." : "Delete"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                Due: {format(new Date(activity.due_date), "PPP")}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Module:</span>
                <span className="text-sm">{activity.module}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Session:</span>
                <span className="text-sm">{activity.session}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Subject:</span>
                <span className="text-sm">{activity.TBI}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Speaker:</span>
                <span className="text-sm">{activity.speaker_name}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{activity.activity_description}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                {/* Commenting out the total submissions for now */}
                {/* <Badge variant="outline" className="mr-2">
                  {activity.submissionsCount}/{activity.totalStudents} Submissions
                </Badge> */}
                <Badge
                  variant={
                    new Date(activity.due_date) < new Date()
                      ? "destructive"
                      : new Date(activity.due_date).getTime() - new Date().getTime() < 86400000 * 3
                        ? "secondary"
                        : "outline"
                  }
                >
                  {new Date(activity.due_date) < new Date()
                    ? "Overdue"
                    : new Date(activity.due_date).getTime() - new Date().getTime() < 86400000 * 3
                      ? "Due Soon"
                      : "Active"}
                </Badge>
              </div>
              <Button size="sm" asChild>
                <Link to={`/dashboard/activities/submissions/${activity.id}`}>View Submissions</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}