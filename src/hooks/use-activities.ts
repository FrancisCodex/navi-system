import { useState, useCallback, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from './use-auth';
import { toast } from 'sonner';
import type { Activity } from '@/constants/types';

export const useActivities = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const canManageActivities = user?.role === 'admin';

  const viewAllActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/activities');
      setActivities(response.data);
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toast.error('Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    viewAllActivities();
  }, [viewAllActivities]);

  const fetchActivityById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/activities/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createActivity = useCallback(async (formData: FormData) => {
    if (!canManageActivities) {
      toast.error('You are not authorized to create an activity');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await axiosInstance.post('/activities', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Activity created successfully');
      viewAllActivities();
    } catch (err) {
      toast.error('Failed to create activity');
    } finally {
      setLoading(false);
    }
  }, [canManageActivities, viewAllActivities]);

  const updateActivity = useCallback(async (id: string, updatedData: any) => {
    if (!canManageActivities) {
      toast.error('You are not authorized to update an activity');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('Updating activity with data:', updatedData);
      await axiosInstance.put(`/activities/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Activity updated successfully');
      viewAllActivities();
    } catch (err) {
      toast.error('Failed to update activity');
    } finally {
      setLoading(false);
    }
  }, [canManageActivities, viewAllActivities]);

  const deleteActivity = useCallback(async (id: string) => {
    if (!canManageActivities) {
      toast.error('You are not authorized to delete an activity');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/activities/${id}`);
      toast.success('Activity deleted successfully');
      setActivities((prevActivities) => prevActivities.filter(activity => activity.id !== id));
    } catch (err) {
      toast.error('Failed to delete activity');
    } finally {
      setLoading(false);
    }
  }, [canManageActivities]);

  const checkTotalStudentSubmitted = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/activities/submissions/${id}`);
      return response.data;
    } catch (err) {
      toast.error('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  }, [canManageActivities]);

  const getActivitiesReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/activities/submissions/report`);
      return response.data;
    } catch (err) {
      toast.error(`Failed to fetch report: ${err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadActivityFile = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/activities/activityfile/download/${id}`, {
        responseType: "blob", // Required for binary file handling
      });

      // Get the file name from the Content-Disposition header
      let fileName = "activity_file";
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

  return {
    activities,
    loading,
    error,
    viewAllActivities,
    fetchActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
    checkTotalStudentSubmitted,
    getActivitiesReport,
    downloadActivityFile,
  };
};