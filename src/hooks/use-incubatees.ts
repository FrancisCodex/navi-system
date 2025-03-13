import { useState, useCallback, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from './use-auth';
import { toast } from 'sonner';
import type { Incubatees } from '@/constants/types';

export const useIncubatees = () => {
    const { user } = useAuth();
    const [incubatees, setIncubatees] = useState<Incubatees[]>([]);
    const [noStartupLeaders, setNoStartupLeaders] = useState<Incubatees[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const canManageIncubatees = user?.role === 'admin';

    const fetchIncubatees = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get('/incubatees');
            console.log("All Incubatees: ", response.data);
            setIncubatees(response.data);
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Failed to fetch incubatees: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIncubatees();
    }, [fetchIncubatees]);

    const fetchIncubateeById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/incubatees/${id}`);
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);
    
    const fetchIncubateesWithoutStartups = useCallback(async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await axiosInstance.get('/incubatees/startup/assign');
            console.log(response.data);
            setNoStartupLeaders(response.data);
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Failed to fetch incubatees: ${errorMessage}`);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return {
        incubatees,
        noStartupLeaders,
        loading,
        error,
        fetchIncubatees,
        fetchIncubateeById,
        fetchIncubateesWithoutStartups
    };
}