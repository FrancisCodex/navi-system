import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { format } from "date-fns"
import { Calendar, Clock, Download, FileText, User, Book, Layers, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useActivities } from "@/hooks/use-activities"

export function ActivityDetail() {
  const { id } = useParams<{ id: string }>()
  const { fetchActivityById, checkTotalStudentSubmitted } = useActivities()
  const [activity, setActivity] = useState<any>(null)
  const [downloading, setDownloading] = useState(false)
  const [submissionData, setSubmissionData] = useState<{ total_incubatees: number, total_submissions: number } | null>(null)

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        const activityData = await fetchActivityById(id)
        setActivity(activityData)
      }
    }
    fetchActivity()
  }, [id, fetchActivityById])

  useEffect(() => {
    const fetchSubmissionData = async () => {
      if (id) {
        const data = await checkTotalStudentSubmitted(id)
        setSubmissionData(data)
      }
    }
    fetchSubmissionData()
  }, [id, checkTotalStudentSubmitted])

  const handleDownload = async () => {
    setDownloading(true)
    try {
      // In a real app, you would download the file from your API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // toast({
      //   title: "File downloaded",
      //   description: `${activity.file.name} has been downloaded successfully.`,
      // })
    } catch (error) {
      // toast({
      //   title: "Download failed",
      //   description: "The file could not be downloaded. Please try again.",
      //   variant: "destructive",
      // })
    } finally {
      setDownloading(false)
    }
  }

  if (!activity) {
    return <div className="flex justify-center items-center h-64">
    <LoaderCircle className="animate-spin h-6 w-6" />
  </div>
  }

  const submissionPercentage = submissionData ? Math.round((submissionData.total_submissions / submissionData.total_incubatees) * 100) : 0

  return (
    <div className="grid gap-6 p-10">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl">{activity.activity_name}</h1>
          <p>Created on {format(new Date(activity.created_at), "PPP")}</p>
        </div>
        <Badge
          variant={
            new Date(activity.due_date) < new Date()
              ? "destructive"
              : new Date(activity.due_date).getTime() - new Date().getTime() < 86400000 * 3
                ? "outline"
                : "default"
          }
        >
          {new Date(activity.due_date) < new Date()
            ? "Overdue"
            : new Date(activity.due_date).getTime() - new Date().getTime() < 86400000 * 3
              ? "Due Soon"
              : "Active"}
        </Badge>
      </div>
      <div className="gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Module:</span>
              <span className="text-sm">{activity.module}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Session:</span>
              <span className="text-sm">{activity.session}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Book className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">TBI:</span>
              <span className="text-sm">{activity.TBI}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Speaker:</span>
              <span className="text-sm">{activity.speaker_name}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Due Date:</span>
            <span className="text-sm">{format(new Date(activity.due_date), "PPP")}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Submission Progress</h3>
            <Progress value={submissionPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{submissionData?.total_submissions} submissions</span>
              <span>{submissionData?.total_incubatees} students</span>
            </div>
          </div>
          {activity.file && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Activity Document</h3>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{activity.file.name}</p>
                    <p className="text-xs text-muted-foreground">{activity.file.size}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4"
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {downloading ? "Downloading..." : "Download"}
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="py-5">
          <h3 className="text-sm font-medium">Description</h3>
          <div className="rounded-md bg-muted p-4">
            <p className="whitespace-pre-line text-sm">{activity.activity_description}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/activities/${activity.id}/edit`}>Edit Activity</Link>
        </Button>
        <Button size="sm" asChild>
          <Link to={`/activities/${activity.id}/submissions`}>
            <FileText className="mr-2 h-4 w-4" />
            View Submissions
          </Link>
        </Button>
      </div>
    </div>
  )
}