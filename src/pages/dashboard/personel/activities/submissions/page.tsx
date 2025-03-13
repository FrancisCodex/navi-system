import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard-header";
import { SubmissionList } from "@/components/submission/submission-list";
import { useSubmission } from "@/hooks/use-submission";
import { LoaderCircle } from "lucide-react";

export default function SubmissionsPage() {
  const { id } = useParams<{ id: string }>();
  const { submissionActivity, loading, fetchSubmissionsForActivity } = useSubmission();

  useEffect(() => {
    if (id) {
        fetchSubmissionsForActivity(id);
    }
  }, [id, fetchSubmissionsForActivity]);

  console.log(submissionActivity);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="p-10">
      <DashboardHeader heading="Activity Submissions" text="View and grade student submissions for this activity." />
      <SubmissionList submissions={submissionActivity} />
    </div>
  );
}