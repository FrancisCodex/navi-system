import { useState, useCallback, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from './use-auth';
import { toast } from 'sonner';
import type { Appointment } from '@/constants/types';

export const useAppointment = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/appointments');
      setAppointments(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const fetchAppointmentForStartup = useCallback(async (startupProfileId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/appointments/startup/${startupProfileId}`);
      toast.success('Appointments for startup fetched successfully');
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toast.error('Failed to fetch appointments for startup');
    } finally {
      setLoading(false);
    }
  }, []);

  const createAppointment = useCallback(async (appointmentData: Omit<Appointment, 'id' | 'incubateeName' | 'mentorName' | 'mentor_expertise' | 'requestedAt' | 'status'>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/appointments', appointmentData);
      setAppointments((prevAppointments) => [...prevAppointments, response.data]);
      toast.success('Appointment created successfully');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toast.error('Failed to create appointment');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAppointment = useCallback(async (appointmentId: string) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.delete(`/appointments/${appointmentId}`);
      setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment.id !== appointmentId));
      toast.success('Appointment deleted successfully');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toast.error('Failed to delete appointment');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAppointment = useCallback(async (appointmentId: string, updatedData: Partial<Appointment>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/appointments/${appointmentId}`, updatedData);
      setAppointments((prevAppointments) => prevAppointments.map((appointment) => 
        appointment.id === appointmentId ? response.data : appointment
      ));
      toast.success('Appointment updated successfully');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toast.error('Failed to update appointment');
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelAppointment = useCallback(async (appointmentId: string) => {
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.put(`/appointments/cancel/${appointmentId}`, { status: 'cancelled' });
      setAppointments((prevAppointments) => prevAppointments.map((appointment) => 
        appointment.id === appointmentId ? { ...appointment, status: 'cancelled' } : appointment
      ));
      toast.success('Appointment cancelled successfully');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toast.error('Failed to cancel appointment');
    } finally {
      setLoading(false);
    }
  }, []);

  const viewAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/appointments');
      setAppointments(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  }, []);

  const viewAllAppointments = useCallback(async () => {
    if (user?.role !== 'admin') {
      toast.error('You are not authorized to view all appointments');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/appointments/all');
      setAppointments(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      toast.error('Failed to fetch all appointments');
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    fetchAppointmentForStartup,
    createAppointment,
    deleteAppointment,
    updateAppointment,
    cancelAppointment,
    viewAppointments,
    viewAllAppointments,
  };
};