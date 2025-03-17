import { useState, useCallback } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from './use-auth';
import { toast } from 'sonner';
import type { StartupProfile } from '@/constants/types';

interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export const useStartupProfile = () => {
  const { user } = useAuth();
  const [startupProfiles, setStartupProfiles] = useState<StartupProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginatedResponse<StartupProfile> | null>(null);

  const fetchStartupProfiles = useCallback(async (page: number = 1, query: string = '') => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/startup?page=${page}&search=${query}`);
      setStartupProfiles(response.data.data);
      setPagination(response.data);
    } catch (err) {
      const errormessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errormessage);
      toast.error(`Failed to fetch startup profiles: ${errormessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStartupProfile = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/startup/details/${id}`);
      return response.data;
    } catch (err) {
      const errormessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errormessage);
      toast.error(`Failed to fetch startup profile: ${errormessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const createStartupProfile = useCallback(async (startupProfileData: Omit<StartupProfile, 'id'>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('create/startup', startupProfileData);
      setStartupProfiles((prevStartupProfiles) => [...prevStartupProfiles, response.data]);
      toast.success(`Startup profile created successfully: ${response.data.startup_name}`);
    } catch (err) {
      const errormessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errormessage);
      toast.error(`Failed to create startup profile: ${errormessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStartupProfile = useCallback(async (id: string, startupProfileData: Partial<StartupProfile>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`update/startup/${id}`, startupProfileData);
      setStartupProfiles((prevStartupProfiles) => prevStartupProfiles.map((profile) => profile.id === id ? response.data : profile));
      toast.success(`Startup profile updated successfully: ${response.data.startup_name}`);
    } catch (err) {
      const errormessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errormessage);
      toast.error(`Failed to update startup profile: ${errormessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteStartupProfile = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`delete/startup/${id}`);
      setStartupProfiles((prevStartupProfiles) => prevStartupProfiles.filter((profile) => profile.id !== id));
      toast.success(`Startup profile deleted successfully: ID ${id}`);
    } catch (err) {
      const errormessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errormessage);
      toast.error(`Failed to delete startup profile: ${errormessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const myStartupProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try{
        const response = await axiosInstance.get('startup/myteam');
        return response.data;
    } catch (err) {
        const errormessage = (err as any).response?.data?.message || 'An Unknown error occured';
        setError(errormessage);
        toast.error(`Failed to fetch startup profile detail: ${errormessage}`)
    } finally {
        setLoading(false);
    }
}, []);


// leaders with startup profile
const fetchLeadersWithStartupProfile = useCallback(async (page: number = 1, query: string = '') => {
    setLoading(true);
    setError(null);

    try{
        const response = await axiosInstance.get(`leaders?page=${page}&search=${query}`);
        return response.data;
    } catch (err) {
        const errormessage = (err as any).response?.data?.message || 'An Unknown error occured';
        setError(errormessage);
        toast.error(`Failed to fetch startup profile detail: ${errormessage}`)
    }
    finally {
        setLoading(false);
    }
}, []);

  return {
    startupProfiles,
    loading,
    error,
    pagination,
    fetchStartupProfiles,
    fetchStartupProfile,
    createStartupProfile,
    updateStartupProfile,
    deleteStartupProfile,
    myStartupProfile,
    fetchLeadersWithStartupProfile
  };
};