import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Download, FileText, User, Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SubmissionDetails } from "@/constants/types";
import { useSubmission } from "@/hooks/use-submission";

interface SubmissionDetailProps {
  submission: SubmissionDetails;
}

export function SubmissionDetail({ submission }: SubmissionDetailProps) {
  const navigate = useNavigate();

  const [downloading, setDownloading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [grade, setGrade] = useState(submission.graded ? "true" : "false");
  const { gradeSubmission } = useSubmission();

  const handleDownload = async () => {
    setDownloading(true);

    try {
      // In a real app, you would call your API to download the file
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setDownloading(false);
    }
  };

  const handleSubmitGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await gradeSubmission(submission.id, { grade: grade === "true" });
      navigate(`/dashboard/activities/submissions/${submission.activity_id}`);
    } catch (error) {
      console.error("Error submitting grade:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Submission Details</CardTitle>
              <CardDescription>{submission.activity_name}</CardDescription>
            </div>
            <Badge variant={submission.graded ? "default" : "outline"}>
              {submission.graded ? "Graded" : "Pending"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Student Information</h3>
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Startup Team:</span>
                    <span className="text-sm">{submission.startup_name}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm font-medium">Leader:</span>
                    <span className="text-sm">{submission.leader_name}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Submission Information</h3>
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Submitted on:</span>
                    <span className="text-sm">{format(new Date(submission.submission_date), "PPP")}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Time:</span>
                    <span className="text-sm">{format(new Date(submission.submission_date), "p")}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">File Information</h3>
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">File name:</span>
                    <span className="text-sm">{submission.file_path.split('/').pop()}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={handleDownload}
                    disabled={downloading}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {downloading ? "Downloading..." : "Download Submission"}
                  </Button>
                </div>
              </div>
            </div>
            {submission.graded ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Submission Mark</h3>
                  <div className="rounded-md bg-muted p-4">
                    <div className="text-2xl font-bold">{submission.graded ? "Complete" : "Incomplete"}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <form onSubmit={handleSubmitGrade}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="grade">Mark Submission</Label>
                      <Select value={grade} onValueChange={setGrade} required>
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Select a grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Complete</SelectItem>
                          <SelectItem value="false">Incomplete</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(`/dashboard/activities/submissions/${submission.activity_id}`)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Grade"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex w-full flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <Button variant="outline" onClick={() => navigate(`/dashboard/activities/submissions/${submission.activity_id}`)}>
              Back to Submissions
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}