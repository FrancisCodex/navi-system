import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "@/components/dashboard-header";
import { TeamMemberCard } from "@/components/startupProfiles/team-member-card";
import { AchievementTimeline } from "@/components/startupProfiles/achievement-timeline";
import { DocumentList } from "@/components/startupProfiles/document-list";
import { AppointmentList } from "@/components/startupProfiles/appointment-list";
import { SubmittedActivityList } from "@/components/startupProfiles/activities-list";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { Separator } from "@/components/ui/separator";

export default function StartupProfilePage() {
  const { id: startupProfileId } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [startup, setStartup] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);

  const { fetchStartupProfiles } = useDashboardData();

  useEffect(() => {
    if (!startupProfileId) {
      setError("Startup profile ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const data = await fetchStartupProfiles(startupProfileId);

        setStartup(data.startup_profile);
        setMembers(data.members);
        setAchievements(data.achievements);
        setDocuments(data.documents);
        setAppointments(data.appointments);
        setSubmissions(data.submissions);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching startup profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startupProfileId, fetchStartupProfiles]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-6">{error}</div>;
  }

  return (
    <div className="p-10">
      <DashboardHeader heading={startup?.startup_name} text={startup?.startup_description}>
        <div className="flex items-center gap-2">
          <Link to="/dashboard/startups">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/dashboard/startups/edit/${startupProfileId}`}>
            <Button>Edit Startup</Button>
          </Link>
        </div>
      </DashboardHeader>

      <div className="grid gap-6 py-5">
        <Card>
          <CardHeader>
            <CardTitle>Startup Overview</CardTitle>
            <CardDescription>Key information about {startup?.startup_name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Industry</div>
                <div>{startup?.industry}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Founded</div>
                <div>{startup?.startup_founded ? new Date(startup.startup_founded).getFullYear() : "N/A"}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <div>
                  <Badge variant={startup?.status === "Active" ? "default" : "secondary"}>{startup?.status}</Badge>
                </div>
              </div>
            </div>

            <Separator/>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Team Members</h3>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {members.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle>Startup Profile</CardTitle>
          <CardDescription>Overview of your startup team</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
        <Tabs defaultValue="team">
          <TabsList className="grid w-fit grid-cols-4">
            <TabsTrigger value="team">Activities</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="mt-6">
            <SubmittedActivityList activities={submissions} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <AchievementTimeline achievements={achievements} />
          </TabsContent>

          <TabsContent value="appointments" className="mt-6">
            <AppointmentList appointments={appointments} />
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <DocumentList documents={documents} />
          </TabsContent>
        </Tabs>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}