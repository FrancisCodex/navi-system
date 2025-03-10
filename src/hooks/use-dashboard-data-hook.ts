import { useState, useEffect, useCallback } from 'react';
import { useAppointment } from './use-appointment';
import { useStartupProfile } from './use-startup-profile';
import type { DashboardData } from '@/constants/types';

export const useDashboardData = (): DashboardData => {
  const { appointments, fetchAppointments, loading: appointmentsLoading } = useAppointment();
  const { startupProfiles, fetchStartupProfiles, loading: startupProfilesLoading } = useStartupProfile();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalStartupProfiles, setTotalStartupProfiles] = useState<number>(0);
  const [pendingAppointments, setPendingAppointments] = useState<number>(0);
  const [totalAppointments, setTotalAppointments] = useState<number>(0);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    await fetchAppointments();
    await fetchStartupProfiles();

    setTotalStartupProfiles(startupProfiles.length);
    setPendingAppointments(appointments.filter(appointment => appointment.status === 'pending').length);
    setTotalAppointments(appointments.length);

    setLoading(false);
  }, [fetchAppointments, fetchStartupProfiles]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  

  return {
    totalStartupProfiles,
    pendingAppointments,
    totalAppointments,
    loading: loading || appointmentsLoading || startupProfilesLoading,
  };
};