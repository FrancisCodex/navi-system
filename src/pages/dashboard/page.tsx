import DashboardTables from "@/components/dashboard_tables"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays, GraduationCap, School, Users } from "lucide-react"
import { NotificationList } from "@/components/notification-list"
import { StudentsList } from "@/components/students-list"
import { Button } from "@/components/ui/button"
import { TeachersList } from "@/components/teachers-list"

const Dashboard = () => {
  return (
    <div className=''>
      <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="ml-2 text-lg font-semibold">Dashboard</h1>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last Quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Incubatees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">+1 from last Quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+5 since yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21</div>
              <p className="text-xs text-muted-foreground">+5 from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <Card className="">
            <CardHeader className="flex flex-row justify-between">
              <div>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Recent appointment requests</CardDescription>
              </div>
              <Button variant="link" size="sm">View all</Button>
            </CardHeader>
            <CardContent>
              <NotificationList />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div>
              <CardTitle>Incubatee</CardTitle>
              <CardDescription>List of active Incubatee</CardDescription>
              </div>
              <Button variant="link" size="sm">View all</Button>
            </CardHeader>
            <CardContent>
              <StudentsList />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='p-8'>
            <DashboardTables/>
      </div>
    </div>
    </div>
  )
}

export default Dashboard