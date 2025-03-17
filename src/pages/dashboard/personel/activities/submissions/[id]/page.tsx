import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard-header";
import { SubmissionDetail } from "@/components/submission/submission-detail";
import { useSubmission } from "@/hooks/use-submission";
import { LoaderCircle } from "lucide-react";

export default function SubmissionDetailPage() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const { fetchSubmissionForActivity, submissionDetail, loading, error } = useSubmission();
  console.log(submissionDetail);

  useEffect(() => {
    if (submissionId) {
      fetchSubmissionForActivity(submissionId);
    }
  }, [submissionId, fetchSubmissionForActivity]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-6">{error}</div>;
  }

  return (
    <div className="p-10">
      <DashboardHeader heading="Submission Details" text="View and grade a student submission." />
      {submissionDetail && <SubmissionDetail submission={submissionDetail} />}
    </div>
  );
}