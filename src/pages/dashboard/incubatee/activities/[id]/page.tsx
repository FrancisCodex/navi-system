import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, BookOpenIcon, UserIcon, UploadIcon, FileIcon, CheckCircleIcon, FileTextIcon, LoaderCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useActivities } from "@/hooks/use-activities"
import { useSubmission } from "@/hooks/use-submission"
import { set } from "date-fns"

interface Activity {
  id: string
  activity_name: string
  module: string
  session: string
  activity_description: string
  speaker_name: string
  TBI: string
  due_date: Date
  activityFile_path?: string
  submission_date?: Date
}

interface Submission {
  id: string
  activity_id: string
  submissionDate: Date
  file: File
  file_url?: string
}

const ActivityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const router = useNavigate()
  const { fetchActivityById } = useActivities()
  const { loading, checkUserSubmission, createSubmission, updateSubmission, deleteSubmission, downloadSubmission } = useSubmission()

  const [activity, setActivity] = useState<Activity | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfirmUnsubmit, setShowConfirmUnsubmit] = useState(false)
  const [submittedFileName, setSubmittedFileName] = useState<string | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [submission, setSubmission] = useState<Submission | null>(null)

  useEffect(() => {
    const fetchActivity = async () => {
      if (id) {
        const activityData = await fetchActivityById(id)
        setActivity(activityData)
      }
    }

    const checkSubmission = async () => {
      if (id) {
        const submissionData = await checkUserSubmission(id)

        if (submissionData?.submitted) {
          setIsSubmitted(true)
          setSubmission(submissionData.submission || null)
          setSubmittedFileName(submissionData.filename || null)
          console.log(submissionData)
          setFileUrl(submissionData.file_url || null)
        } else {
          setIsSubmitted(false)
          setSubmittedFileName(null)
          setFileUrl(null)
        }
      }
    }

    fetchActivity()
    checkSubmission()
  }, [id, fetchActivityById, checkUserSubmission])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertTitle>Activity not found</AlertTitle>
          <AlertDescription>The activity you are looking for does not exist.</AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => router("/")}>
          Back to Dashboard
        </Button>
      </div>
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsSubmitting(true)

    try {
      if (isSubmitted) {
        if (id) {
          await updateSubmission(id, { activity_id: id, submissionDate: new Date(), file })
        }
      } else {
        if (id) {
          await createSubmission({ activity_id: id, submissionDate: new Date(), file })
        }
      }
      setIsSubmitted(true)
      setSubmittedFileName(file.name)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUnsubmit = () => {
    setShowConfirmUnsubmit(true)
  }

  const confirmUnsubmit = async () => {
    const id = submission?.id
    try {
      if (id) {
        await deleteSubmission(id)
      }
      setIsSubmitted(false)
      setFile(null)
      setSubmittedFileName(null)
      setFileUrl(null)
    } catch (error) {
      console.error(error)
    } finally {
      setShowConfirmUnsubmit(false)
    }
  }

  const cancelUnsubmit = () => {
    setShowConfirmUnsubmit(false)
  }

  const handleDownloadSubmission = async () => {
    if (submission?.id) {
      await downloadSubmission(submission.id)
    } else {
      alert('No file to download')
    }
  }


  return (
    <div className="p-10">
      <Button variant="outline" className="mb-6" onClick={() => router("/incubatees/activities")}>
        ← Back to Activities
      </Button>

      {showConfirmUnsubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">Confirm Unsubmit</h3>
            <p className="mb-4">
              Are you sure you want to unsubmit your work? This will allow you to submit a new file.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={cancelUnsubmit}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmUnsubmit}>
                Unsubmit
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{activity.activity_name}</CardTitle>
                  <CardDescription className="text-lg mt-1">
                    {activity.module} • {activity.session}
                  </CardDescription>
                </div>
                <Badge variant={isSubmitted ? "default" : "destructive"} className="text-sm">
                  {isSubmitted ? "Submitted" : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Activity Details</h3>
                <p className="whitespace-pre-line">{activity.activity_description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      <strong>Speaker:</strong> {activity.speaker_name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <BookOpenIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      <strong>Subject:</strong> {activity.TBI}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      <strong>Due Date:</strong> {new Date(activity.due_date).toLocaleDateString()}
                    </span>
                  </div>
                  {isSubmitted && activity.submission_date && (
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                      <span>
                        <strong>Submitted:</strong> {new Date(activity.submission_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-lg mb-2">Attached Resources</h3>
                <Button variant="outline" className="flex items-center">
                  <FileIcon className="h-4 w-4 mr-2" />
                  <p className="text-ellipsis">{activity.activityFile_path}</p>
                  <span className="ml-2 text-xs text-muted-foreground">(Download)</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Work</CardTitle>
              <CardDescription>Upload your completed assignment here</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="py-4">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircleIcon className="h-10 w-10 text-green-500 mr-2" />
                    <h3 className="font-medium text-lg">Assignment Submitted</h3>
                  </div>

                  {submittedFileName && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center">
                        <FileIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm truncate flex-1">{submittedFileName}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1" onClick={handleDownloadSubmission}>
                          <FileTextIcon className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={handleUnsubmit}>
                          <UploadIcon className="h-4 w-4 mr-2" />
                          Unsubmit
                        </Button>
                      </div>
                    </div>
                  )}

                  {activity.submission_date && (
                    <p className="text-sm mt-4 text-center text-muted-foreground">
                      Submitted on {new Date(activity.submission_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <UploadIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground mt-1">PDF, DOCX, or ZIP (max. 10MB)</p>
                    </label>
                  </div>

                  {file && (
                    <div className="mt-4 p-3 bg-muted rounded-lg flex items-center">
                      <FileIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm truncate">{file.name}</span>
                      <Badge variant="outline" className="ml-auto">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Badge>
                    </div>
                  )}

                  <Button type="submit" className="w-full mt-4" disabled={!file || isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Assignment"}
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              <p>Due by {new Date(activity.due_date).toLocaleDateString()} at 11:59 PM</p>
            </CardFooter>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="h-full w-0.5 bg-border" />
                  </div>
                  <div>
                    <p className="font-medium">Activity Published</p>
                    <p className="text-sm text-muted-foreground">March 1, 2025</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="h-full w-0.5 bg-border" />
                  </div>
                  <div>
                    <p className="font-medium">Due Date</p>
                    <p className="text-sm text-muted-foreground">{new Date(activity.due_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className={`h-2 w-2 rounded-full ${isSubmitted ? "bg-primary" : "bg-muted"}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${!isSubmitted && "text-muted-foreground"}`}>
                      {isSubmitted ? "Submitted" : "Pending Submission"}
                    </p>
                    {isSubmitted && activity.submission_date && (
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.submission_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ActivityDetails