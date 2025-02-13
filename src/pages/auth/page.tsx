import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from '@/hooks/use-auth'
import React, { useState } from 'react'
import Logo from "@/assets/navigatu_logo.png"

const Login = () => {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('employee')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(email, password)
      if (userType === 'employee') {
        navigate('/dashboard')
      } else if (userType === 'incubatee') {
        navigate('/incubatees')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center bg-gray-100 p-10 rounded-lg">
        <div className="p-10 rounded-lg">
        <div className="mb-5 flex items-center justify-center">
            <img src={Logo} alt="Navigatu Logo" className='w-64' />
          </div>
          <h1 className="text-2xl font-bold mb-5">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-96 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-96 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Organization</label>
              <Select defaultValue='employee' onValueChange={setUserType}>
                <SelectTrigger className='bg-white p-2 border border-gray-300 rounded-md'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='employee'>Employee</SelectItem>
                  <SelectItem value='incubatee'>Incubatee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-5">
              <button type="submit" className="bg-blue-950 hover:bg-blue-900 text-white p-2 rounded-lg w-96" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login