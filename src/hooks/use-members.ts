import { useState, useCallback, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from './use-auth';
import { toast } from 'sonner';
import type { Members } from '@/constants/types';

export const useMembers = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [members, setMembers] = useState<Members[]>([]);
    const { user } = useAuth();

    const fetchMembers = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/startup/members/${id}`);
            return response.data
            // toast.success('Members fetched successfully');
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Failed to fetch members: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const countMembers = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/members/count/${id}`);
            return response.data.count;
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Failed to count members: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const createMember = useCallback(async (startup_profile_id: string, memberData: Omit<Members, 'id'>) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post(`/startup/add/member/${startup_profile_id}`, memberData);
            setMembers((prevMembers) => [...prevMembers, response.data]);
            toast.success(`Member added successfully: ${response.data.name}`);
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Failed to add member: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateMember = useCallback(async (id: string, memberData: Partial<Members>) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.put(`/members/${id}`, memberData);
            setMembers((prevMembers) => prevMembers.map((member) => member.id === id ? response.data : member));
            toast.success(`Member updated successfully: ${response.data.name}`);
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Failed to update member: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteMember = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            await axiosInstance.delete(`/members/${id}`);
            setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
            toast.success(`Member deleted successfully: ID ${id}`);
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Failed to delete member: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        members,
        fetchMembers,
        countMembers,
        createMember,
        updateMember,
        deleteMember,
    };
};