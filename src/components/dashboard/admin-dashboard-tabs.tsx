import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StartupGroupsTable } from "./startup-groups-table";
import { MentorsTable } from "./mentors-table";

interface AdminDashboardTabsProps {
  startupGroups: any[];
  mentors: any[];
}

const AdminDashboardTabs = ({ startupGroups, mentors }: AdminDashboardTabsProps) => {
  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue="startups" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="startups">Startup Groups</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
          </TabsList>
          <CardContent className="pt-6">
            <TabsContent value="startups" className="mt-0">
              <StartupGroupsTable startupGroups={startupGroups} />
            </TabsContent>
            <TabsContent value="mentors" className="mt-0">
              <MentorsTable mentors={mentors} />
            </TabsContent>
          </CardContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

export default AdminDashboardTabs;
