
import React, { useEffect, useState, Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { AppointmentsList } from "@/components/dashboard/appointments-list";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { DashboardHeader } from "@/components/dashboard-header";

const AdminDashboardTabs = React.lazy(() => 
  import("@/components/dashboard/admin-dashboard-tabs").then(module => ({ default: module.default }))
);

const Dashboard = () => {
  const { fetchDashboardDetailsAdmin, loading, error } = useDashboardData();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [startupProfiles, setStartupProfiles] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardDetailsAdmin();
        setAppointments(data.appointments);
        setActivities(data.activities);
        setStartupProfiles(data.startupProfiles);
        setMentors(data.mentors);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, [fetchDashboardDetailsAdmin]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-6">{error}</div>;
  }

  return (
    <div className="flex flex-col p-5">
      <div className="border-b pb-4">
      <DashboardHeader heading="Dashboard" text="Manage all your activities in one place." />
      </div>
      <div className="flex-1 space-y-4 p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <AppointmentsList appointments={appointments} />
          <ActivityCard activities={activities} />
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
