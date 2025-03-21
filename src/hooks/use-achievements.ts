import { useState, useCallback } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { toast } from 'sonner';
import type { Achievement } from "@/constants/types"

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/startup/achievements/${id}`);
      toast.success('Achievements fetched successfully');
      return response.data
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to fetch achievements: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const showAchievement = useCallback(async (id: string, startupID: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/startup/achievements/${startupID}/${id}`);
      return response.data;
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to fetch achievement: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAchievement = useCallback(async (achievementData: Omit<Achievement, 'id'>) => {
    setLoading(true);
    setError(null);
  
    try {
      const formData = new FormData();
  
      Object.entries(achievementData).forEach(([key, value]) => {
        if (key === 'photos' && Array.isArray(value)) {
          value.forEach((file) => formData.append('photos[]', file)); // Correct array format
        } else {
          formData.append(key, value as string | Blob);
        }
      });
  
      console.log("Final FormData before submission:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
  
      const response = await axiosInstance.post('/startup/add/achievement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setAchievements((prevAchievements) => [...prevAchievements, response.data]);
      toast.success(`Achievement created successfully: ${response.data.competition_name}`);
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to create achievement: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);
  
  

  const updateAchievement = useCallback(async (id: string, achievementData: Partial<Achievement>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/achievements/${id}`, achievementData);
      setAchievements((prevAchievements) => prevAchievements.map((achievement) => achievement.id === id ? response.data : achievement));
      toast.success(`Achievement updated successfully: ${response.data.competition_name}`);
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to update achievement: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAchievement = useCallback(async (id: string, startup_profile_id: string) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`startup/delete/achievement/${startup_profile_id}/${id}`);
      setAchievements((prevAchievements) => prevAchievements.filter((achievement) => achievement.id !== id));
      toast.success(`Achievement deleted successfully: ID ${id}`);
    } catch (err) {
      const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
      setError(errorMessage);
      toast.error(`Failed to delete achievement: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    achievements,
    loading,
    error,
    fetchAchievements,
    showAchievement,
    createAchievement,
    updateAchievement,
    deleteAchievement,
  };
};