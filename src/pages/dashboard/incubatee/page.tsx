import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  User,
  Calendar,
  Clock,
  FileText,
  LoaderCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import type { DashboardData, StartupProfile, Leader, Member, Mentor, Activity, Submission, Appointment } from "@/constants/types-dashboard";

export default function Dashboard() {
  const { fetchDashboardDetailsIncubatee } = useDashboardData();
  const [startupProfile, setStartupProfile] = useState<StartupProfile | null>(null);
  const [leader, setLeader] = useState<Leader | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: DashboardData = await fetchDashboardDetailsIncubatee();
      setStartupProfile(data.startup_profile);
      setLeader(data.leader);
      setMembers(data.members);
      setActivities(data.activities);
      setSubmissions(data.submissions);
      setAppointments(data.appointments);
      setMentors(data.mentors);
    };

    fetchData();
  }, [fetchDashboardDetailsIncubatee]);

  if (!startupProfile || !leader) {
    return <div className="flex justify-center items-center h-full">
      <LoaderCircle className="animate-spin h-6 w-6" />
    </div>;
  }

  return (
    <div className="flex bg-background">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="grid gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          </div>

          {/* Startup Overview Card */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>My Startup</CardTitle>
                <CardDescription>Overview of your startup team</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Startup Name</div>
                    <div className="text-xl font-bold">{startupProfile.startup_name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Team Members</div>
                    <div className="text-xl font-bold">{members.length}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Industry</div>
                    <div className="flex items-center gap-2">
                      <span>{startupProfile.industry}</span>
                      <Badge variant="outline">{startupProfile.industry}</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Founded</div>
                    <div>{new Date(startupProfile.startup_founded).toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild>
                  <Link to="myTeam" className="w-full">
                    View My Startup
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Mentors Card */}
            <Card className="flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle>Mentors</CardTitle>
                  <CardDescription>Available mentors for guidance</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  {mentors.map((mentor) => (
                    <div key={mentor.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{mentor.mentorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-none">{mentor.mentorName}</p>
                            <p className="text-xs text-muted-foreground">{mentor.expertise}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Years of Experience: {mentor.yearsOfExperience}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link to="appointments" className="w-full">
                <Button className="w-full">
                  View All Mentors
                </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Activities Card */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>Activities</CardTitle>
                <CardDescription>Upcoming tasks and deadlines</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.activity_name}</p>
                      <p className="text-xs text-muted-foreground">Module: {activity.module}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={new Date(activity.due_date) < new Date() ? "destructive" : "outline"}>
                        {new Date(activity.due_date).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto">
              <Link to="activities" className="w-full">
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}