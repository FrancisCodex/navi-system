import { useCallback, useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from './use-auth';
import { toast } from 'sonner';

export const useMentor = () => {
    const { user } = useAuth();
    const [mentors, setMentors] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const canManageMentors = user?.role === 'admin';

    const viewAllMentors = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get('/mentors');
            setMentors(response.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            toast.error('Failed to fetch mentors');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        viewAllMentors();
    }, [viewAllMentors]);

    const getMentor = useCallback(async (id: string) => {
        try {
            const response = await axiosInstance.get(`/mentors/${id}`);
            return response.data;
        } catch (err) {
            toast.error('Failed to fetch mentor details');
            throw err;
        }
    }, []);

    const createMentor = useCallback(async (mentorData: any) => {
        if (!canManageMentors) {
            toast.error('You are not authorized to create a mentor');
            return;
        }

        try {
            await axiosInstance.post('/mentors', mentorData);
            toast.success('Mentor created successfully');
            viewAllMentors();
        } catch (err) {
            toast.error('Failed to create mentor');
        }
    }, [canManageMentors, viewAllMentors]);

    const updateMentor = useCallback(async (id: string, mentorData: any) => {
        if (!canManageMentors) {
            toast.error('You are not authorized to edit a mentor');
            return;
        }

        try {
            await axiosInstance.put(`/mentors/${id}`, mentorData);
            toast.success('Mentor updated successfully');
            viewAllMentors();
        } catch (err) {
            toast.error('Failed to update mentor');
        }
    }, [canManageMentors, viewAllMentors]);

    const deleteMentor = useCallback(async (id: string) => {
        if (!canManageMentors) {
            toast.error('You are not authorized to delete a mentor');
            return;
        }

        try {
            await axiosInstance.delete(`/mentors/${id}`);
            toast.success('Mentor deleted successfully');
            viewAllMentors();
        } catch (err) {
            toast.error('Failed to delete mentor');
        }
    }, [canManageMentors, viewAllMentors]);

    return { mentors, loading, error, viewAllMentors, getMentor, createMentor, updateMentor, deleteMentor, canManageMentors };
};