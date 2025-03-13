import { useState, useCallback } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { toast } from 'sonner';
import type { DashboardData } from '@/constants/types-dashboard';

export const useDashboardData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStartupProfiles = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/data/startup/${id}`);
      return response.data;
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to fetch startup profile: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDashboardDetailsAdmin = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/data/dashboard/admin');
      return response.data;
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to fetch dashboard details: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDashboardDetailsIncubatee = useCallback(async (): Promise<DashboardData> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/data/dashboard/incubatee');
      return response.data;
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to fetch dashboard details: ${errorMessage}`);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStartupProfileIncubatee = useCallback(async () => { 
    setLoading(true);
    setError(null);

    try {
        const response = await axiosInstance.get('/data/myteam');
        return response.data;
    } catch (err) {
        const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
        setError(errorMessage);
        toast.error(`Failed to fetch startup profile: ${errorMessage}`);
    } finally {
        setLoading(false);
    }
  }, []);

  return { fetchStartupProfiles, fetchDashboardDetailsAdmin, fetchDashboardDetailsIncubatee, fetchStartupProfileIncubatee, loading, error };
};