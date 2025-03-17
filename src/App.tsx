import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/auth/privateroute'
import { Toaster } from "@/components/ui/sonner"
import Login from '@/pages/auth/page'
import Home from '@/pages/home/page'
import Navbar from '@/components/navbar'
import Dashboard from '@/pages/dashboard/page'
import PrivateLayout from './layouts/private'
import PublicLayout from './layouts/public'
import IncubateeList from './pages/dashboard/personel/incubatees/page'
import Appointments from './pages/dashboard/personel/appointments/page'
import MentorsList from './pages/dashboard/personel/mentors/page'
import AddMentors from './pages/dashboard/personel/mentors/addMentors/page'
import TeamPage from './pages/dashboard/personel/incubatees/team/page'
import Activities from './pages/dashboard/personel/activities/page'
import IncubateeDashboard from './pages/dashboard/incubatee/page'
import SetAppointments from './pages/dashboard/incubatee/appointment/page'
import ActivitiesIncubatee from './pages/dashboard/incubatee/activities/page'
import ActivityDetails from './pages/dashboard/incubatee/activities/[id]/page'
import { ActivityDetail } from './pages/dashboard/personel/activities/[id]/page'
import NewStartupPage from './pages/dashboard/personel/startupProfiles/new/page'
import StartupProfiles from './pages/dashboard/personel/startupProfiles/page'
import StartupProfilePage from './pages/dashboard/personel/startupProfiles/[id]/page'
import LeadersPage from './pages/dashboard/personel/leaders/page'
import NewLeaderPage from './pages/dashboard/personel/leaders/new/page'
import SubmissionsPage from './pages/dashboard/personel/activities/submissions/page'
import MyStartupProfile from './pages/dashboard/incubatee/myteam/page'
import SubmissionDetailPage from './pages/dashboard/personel/activities/submissions/[id]/page'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Login />} />

          {/* Private Routes for Admin */}
          <Route path='/dashboard/*' element={
            <PrivateLayout>
              <Routes>
                <Route path='/' element={<PrivateRoute element={<Dashboard/>} allowedRoles={['admin']}  />} />
                <Route path='/incubatees' element={<PrivateRoute element={<IncubateeList/>} allowedRoles={['admin']} />}/>
                <Route path='/incubatees/:id' element={<PrivateRoute element={<TeamPage/>} allowedRoles={['admin']} />}/>
                <Route path='/appointments' element={<PrivateRoute element={<Appointments/>} allowedRoles={['admin']} />}/>
                <Route path='/activities' element={<PrivateRoute element={<Activities/>} allowedRoles={['admin']} />}/>
                <Route path='/mentors' element={<PrivateRoute element={<MentorsList/>} allowedRoles={['admin']} />}/>
                <Route path='/add/mentors' element={<PrivateRoute element={<AddMentors/>} allowedRoles={['admin']} />}/>
                {/* Activities Route */}
                <Route path='/activities/:id' element={<PrivateRoute element={<ActivityDetail/>} allowedRoles={['admin']} />}/>
                <Route path='/activities/submissions/:id' element={<PrivateRoute element={<SubmissionsPage/>} allowedRoles={['admin']} />}/>
                <Route path='/activities/submissions/grade/:submissionId' element={<PrivateRoute element={<SubmissionDetailPage/>} allowedRoles={['admin']} />}/>
                {/* Startup Routes */}
                <Route path='/startups' element={<PrivateRoute element={<StartupProfiles/>} allowedRoles={['admin']} />}/>
                <Route path='/startups/:id' element={<PrivateRoute element={<StartupProfilePage/>} allowedRoles={['admin']} />}/>
                <Route path='/startups/new' element={<PrivateRoute element={<NewStartupPage/>} allowedRoles={['admin']} />}/>
                {/* Leaders Routes */}
                <Route path='/leaders' element={<PrivateRoute element={<LeadersPage/>} allowedRoles={['admin']} />}/>
                <Route path='/leaders/new' element={<PrivateRoute element={<NewLeaderPage/>} allowedRoles={['admin']} />}/>
              </Routes>
            </PrivateLayout>
          } />

          {/* Incubatee Routes */}

          <Route path='/incubatees/*' element={
            <PrivateLayout>
              <Routes>
                <Route path='/' element={<PrivateRoute element={<IncubateeDashboard/>} allowedRoles={['incubatee']}/>}/>
                <Route path='/appointments' element={<PrivateRoute element={<SetAppointments/>} allowedRoles={['incubatee']}/>}/>
                <Route path='/activities' element={<PrivateRoute element={<ActivitiesIncubatee/>} allowedRoles={['incubatee']}/> }/>
                <Route path='/activities/:id' element={<PrivateRoute element={<ActivityDetails/>} allowedRoles={['incubatee']}/>}/>
                <Route path='/myteam' element={<PrivateRoute element={<MyStartupProfile/>} allowedRoles={['incubatee']}/>}/>
              </Routes>
            </PrivateLayout>}
          />
          <Route path='*' element={<PublicLayout><h1>404</h1></PublicLayout>} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App