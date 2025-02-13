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
import AddActionPage from './pages/dashboard/personel/activities/addActivity/page'
import SubmissionCheckingPage from './pages/dashboard/personel/activities/checkActivity/page'
import CompletionPage from './pages/dashboard/personel/activities/completion/page'
import Activities from './pages/dashboard/personel/activities/page'
import IncubateeDashboard from './pages/dashboard/incubatee/page'
import SetAppointments from './pages/dashboard/incubatee/appointment/page'

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
                <Route path='/' element={<PrivateRoute element={<Dashboard/>} />} />
                <Route path='/incubatees' element={<PrivateRoute element={<IncubateeList/>}/>}/>
                <Route path='/incubatees/:id' element={<PrivateRoute element={<TeamPage/>}/>}/>
                <Route path='/appointments' element={<PrivateRoute element={<Appointments/>}/>}/>
                <Route path='/activities' element={<PrivateRoute element={<Activities/>}/>}/>
                <Route path='/mentors' element={<PrivateRoute element={<MentorsList/>}/>}/>
                <Route path='/add/mentors' element={<PrivateRoute element={<AddMentors/>}/>}/>
                {/* Activities Route */}
                <Route path='/activities/add' element={<PrivateRoute element={<AddActionPage/>}/>}/>
                <Route path='/activities/completed' element={<PrivateRoute element={<CompletionPage/>}/>}/>
                <Route path='/activities/check' element={<PrivateRoute element={<SubmissionCheckingPage/>}/>}/>
              </Routes>
            </PrivateLayout>
          } />

          {/* Incubatee Routes */}

          <Route path='/incubatees/*' element={
            <PrivateLayout>
              <Routes>
                <Route path='/' element={<PrivateRoute element={<IncubateeDashboard/>}/>}/>
                <Route path='/appointments' element={<PrivateRoute element={<SetAppointments/>}/>}/>
                <Route path='/mentors' element={<PrivateRoute element={<h1>Building</h1>}/>}/>
                <Route path='/activities' element={<PrivateRoute element={<h1>Building</h1>}/>}/>
                <Route path='/myTeam' element={<PrivateRoute element={<h1>Building</h1>}/>}/>
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