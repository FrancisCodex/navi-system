import { useState, useCallback } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from './use-auth';
import { toast } from 'sonner';
import type { Document } from '@/constants/types';

export const useDocuments = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);

    const fetchDocuments = useCallback(async (startupProfileId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/documents/${startupProfileId}`);
            toast.success('Documents fetched successfully');
            return response.data
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'Failed to fetch documents';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const showDocument = useCallback(async (documentId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/documents/show/${documentId}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            window.open(url);
            toast.success('Document fetched successfully');
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'Failed to fetch document';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const downloadDocument = useCallback(async (documentId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/documents/download/${documentId}`, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('Document downloaded successfully');
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'Failed to download document';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const createDocument = useCallback(async (startupProfileId: string, documentData: FormData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.post(`/documents/${startupProfileId}`, documentData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setDocuments((prevDocuments) => [...prevDocuments, response.data]);
            toast.success('Document created successfully');
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'Failed to create document';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteDocument = useCallback(async (documentId: string) => {
        setLoading(true);
        setError(null);

        try {
            await axiosInstance.delete(`/documents/${documentId}`);
            setDocuments((prevDocuments) => prevDocuments.filter((document) => document.id !== documentId));
            toast.success('Document deleted successfully');
        } catch (err) {
            const errorMessage = (err as any).response?.data?.message || 'Failed to delete document';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        documents,
        loading,
        error,
        fetchDocuments,
        showDocument,
        downloadDocument,
        createDocument,
        deleteDocument,
    };
};