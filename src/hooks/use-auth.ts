import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import axiosInstance from '@/api/axiosInstance';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_WITH_CREDENTIALS = { withCredentials: true };

export const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/user`, {
                    ...API_WITH_CREDENTIALS,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

        // return () => {
        //     setUser(null);
        // };
    }, []);

    const login = async (email: string, password: string, userType: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password, user_type: userType }, API_WITH_CREDENTIALS);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token); // Store the token in localStorage
            toast.success('Login successful');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Login failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE_URL}/logout`, null, {
                ...API_WITH_CREDENTIALS,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(null);
            localStorage.removeItem('token'); // Remove the token from localStorage
            toast.success('Logout successful');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Logout failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const register = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            await axios.post(`${API_BASE_URL}/register`, { email, password }, API_WITH_CREDENTIALS);
            toast.success('Account created successfully');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Registration failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    //register a incubatee user
    const registerIncubatee = async (email: string, password: string, password_confirmation: string, name: string) => {
        setLoading(true);
        setError(null);

        try {
            await axiosInstance.post(`register/incubatee`, { email, password, password_confirmation, name });
            toast.success('Incubatee account created successfully');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            toast.error(`Incubatee registration failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }
    
    return { loading, error, user, login, logout, register, registerIncubatee };
}