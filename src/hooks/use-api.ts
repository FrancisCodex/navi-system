import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/api/axiosInstance';

const useApi = (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body: any = null) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance({
                method,
                url: endpoint,
                data: body,
            });
            setData(response.data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    }, [endpoint, method, body]);

    useEffect(() => {
        if (method === 'GET') {
            fetchData();
        }
    }, [fetchData, method]);

    return { data, loading, error, fetchData };
};

export default useApi;