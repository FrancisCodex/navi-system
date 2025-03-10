import React, { useEffect, useState, useMemo, Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { AppointmentsList } from "@/components/dashboard/appointments-list";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { useActivities } from "@/hooks/use-activities";
import { useAppointment } from "@/hooks/use-appointment";
import { useStartupProfile } from "@/hooks/use-startup-profile";
import { useMentor } from "@/hooks/create-mentor";

const AdminDashboardTabs = React.lazy(() => 
  import("@/components/dashboard/admin-dashboard-tabs").then(module => ({ default: module.default }))
);

const Dashboard = () => {
  const { getActivitiesReport } = useActivities();
  const { appointments, fetchAppointments } = useAppointment();
  const { startupProfiles, fetchStartupProfiles } = useStartupProfile();
  const { mentors, viewAllMentors } = useMentor();
  const [combinedActivities, setCombinedActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [appointmentsData, startupProfilesData, mentorsData, activitiesReport] = await Promise.all([
          fetchAppointments(),
          fetchStartupProfiles(),
          viewAllMentors(),
          getActivitiesReport(),
        ]);
        setCombinedActivities(activitiesReport);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchAppointments, fetchStartupProfiles, viewAllMentors, getActivitiesReport]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="ml-2 text-lg font-semibold">Dashboard</h1>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <AppointmentsList appointments={appointments} />
          <ActivityCard activities={combinedActivities} />
        </div>
      </div>
      <div className="p-8">
        <Suspense fallback={<LoaderCircle className="animate-spin h-6 w-6" />}>
          <AdminDashboardTabs startupGroups={startupProfiles} mentors={mentors} />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
