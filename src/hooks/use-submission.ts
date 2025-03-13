import { useState, useCallback } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from '@/context/AuthProvider';
import { toast } from 'sonner';
import type { Submission, SubmissionDetails } from '@/constants/types';

interface CheckSubmissionResponse {
  file_url: null;
  filename: null;
  submitted: boolean;
  submission?: Submission;
}

export const useSubmission = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submissionActivity, setSubmissionActivity] = useState<SubmissionDetails[]>([]);
  const [submissionDetail, setSubmissionDetail] = useState<SubmissionDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const canManageSubmissions = user?.role === 'admin';

  // Fetch all submissions for a specific activity (admin only)
  const fetchSubmissions = useCallback(async (activity_id: string) => {
    if (!canManageSubmissions) {
      toast.error('You are not authorized to view submissions');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/submissions?activity_id=${activity_id}`);
      setSubmissions(response.data);
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to fetch submissions: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [canManageSubmissions]);

  // Create a submission (incubatee users only)
  const createSubmission = useCallback(async (submissionData: Omit<Submission, 'id'>) => {
    if (canManageSubmissions) {
      toast.error('Admins cannot create submissions');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('activity_id', submissionData.activity_id);
      formData.append('submissionDate', submissionData.submissionDate.toISOString());
      formData.append('file', submissionData.file);

      const response = await axiosInstance.post(`/activities/submit/${submissionData.activity_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmissions((prevSubmissions) => [...prevSubmissions, response.data]);
      toast.success('Submission created successfully');
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to create submission: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [canManageSubmissions]);

  // Update a submission (incubatee users only)
  const updateSubmission = useCallback(async (id: string, updatedData: Omit<Submission, 'id'>) => {
    if (canManageSubmissions) {
      toast.error('Admins cannot update submissions');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('activity_id', updatedData.activity_id);
      formData.append('submissionDate', updatedData.submissionDate.toISOString());
      formData.append('file', updatedData.file);

      await axiosInstance.put(`/submissions/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) =>
          submission.id === id ? { ...submission, ...updatedData } : submission
        )
      );
      toast.success('Submission updated successfully');
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to update submission: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [canManageSubmissions]);

  // Delete a submission (incubatee users only)
  const deleteSubmission = useCallback(async (id: string) => {
    if (canManageSubmissions) {
      toast.error('Admins cannot delete submissions');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`/activities/unsubmit/${id}`);
      setSubmissions((prevSubmissions) => prevSubmissions.filter((submission) => submission.id !== id));
      toast.success('Submission deleted successfully');
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to delete submission: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [canManageSubmissions]);

  // Check if the incubatee user has already submitted their output for an activity
  const checkUserSubmission = useCallback(async (activity_id: string): Promise<CheckSubmissionResponse | null> => {
    if (canManageSubmissions) {
      toast.error('Admins cannot check user submissions');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/submissions/check/${activity_id}`);
      return response.data;
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to check submission: ${errorMessage}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [canManageSubmissions]);

  // Download a submission file
  const downloadSubmission = useCallback(async (submission_id: string) => {
      setLoading(true);
      setError(null);

      try {
          const response = await axiosInstance.get(`/submission/download/${submission_id}`, {
              responseType: "blob", // Required for binary file handling
          });

          // Get the file name from the Content-Disposition header
          let fileName = "submission_file";
          const contentDisposition = response.headers["content-disposition"];
          if (contentDisposition) {
              const fileNameMatch = contentDisposition.match(/filename="?(.+?)"?$/);
              if (fileNameMatch) {
                  fileName = decodeURIComponent(fileNameMatch[1]); // Ensure correct decoding
              }
          }

          // Create a Blob object with the correct MIME type
          const blob = new Blob([response.data], { type: response.data.type });

          // Create an object URL and trigger the download
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();

          // Cleanup
          link.remove();
          window.URL.revokeObjectURL(url);

          toast.success(`File "${fileName}" downloaded successfully`);
      } catch (err) {
          const errorMessage = (err as any).response?.data?.message || "An unknown error occurred";
          setError(errorMessage);
          toast.error(`Failed to download file: ${errorMessage}`);
      } finally {
          setLoading(false);
      }
  }, []);

  const fetchSubmissionsForActivity = useCallback(async (activity_id: string) => {
    setLoading(true);
    setError(null);

    try{
      const response = await axiosInstance.get(`/submissions/activities/${activity_id}`);
      setSubmissionActivity(response.data);
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to fetch submissions: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSubmissionForActivity = useCallback(async (submission_id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/submissions/activity/${submission_id}`);
      console.log(response.data);
      setSubmissionDetail(response.data);
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to fetch submissions: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const gradeSubmission = useCallback(async (submission_id: string, gradeData: { grade: boolean }) => {
    setLoading(true);
    setError(null);

    console.log(gradeData);
    try {
      await axiosInstance.put(`/submissions/grade/${submission_id}`, gradeData);
      toast.success('Submission graded successfully');
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to grade submission: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    submissions,
    submissionActivity,
    submissionDetail,
    loading,
    error,
    fetchSubmissions,
    createSubmission,
    updateSubmission,
    deleteSubmission,
    checkUserSubmission,
    downloadSubmission,
    fetchSubmissionsForActivity,
    fetchSubmissionForActivity,
    gradeSubmission,
  };
};