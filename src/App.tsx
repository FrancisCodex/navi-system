
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login />} />
        {/* Private Routes */}

        {/* Admin/Personel Routes */}
        
        <Route path='/dashboard' element={<PrivateLayout> <Dashboard/> </PrivateLayout>} />
        <Route path='/dashboard/incubatees' element={<PrivateLayout> <IncubateeList/> </PrivateLayout>} />
        <Route path='/dashboard/incubatees/:id' element={<PrivateLayout><TeamPage/></PrivateLayout>} />
        <Route path='/dashboard/appointments' element={<PrivateLayout> <Appointments/> </PrivateLayout>} />
        <Route path='/dashboard/activities' element={<PrivateLayout> <h1>Building .⚒️⚒️</h1> </PrivateLayout>} />
        <Route path='/dashboard/mentors' element={<PrivateLayout> <MentorsList/> </PrivateLayout>} />
        <Route path='/dashboard/add/mentors' element={<PrivateLayout> <AddMentors/> </PrivateLayout>} />

        {/* Incubatee Routes */}
        <Route path='/incubatee' element={<PrivateLayout> <h1>Building .⚒️⚒️</h1> </PrivateLayout>} />
        <Route path='/incubatee/appointments' element={<PrivateLayout> <h1>Building .⚒️⚒️</h1> </PrivateLayout>} />
        <Route path='/incubatee/mentors' element={<PrivateLayout> <h1>Building .⚒️⚒️</h1> </PrivateLayout>} />
        <Route path='/incubatee/activities' element={<PrivateLayout> <h1>Building .⚒️⚒️</h1> </PrivateLayout>} />
        <Route path='/incubatee/myTeam' element={<PrivateLayout> <h1>Building .⚒️⚒️</h1> </PrivateLayout>} />


        {/* Error */}

        <Route path='*' element={<PublicLayout><h1>404</h1></PublicLayout>}/>

        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
