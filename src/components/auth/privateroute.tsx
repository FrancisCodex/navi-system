import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import Loading from '@/components/loading'

interface PrivateRouteProps {
  element: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user, loading } = useAuth()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false)
    }, 1000) // 1 second delay

    return () => clearTimeout(timer)
  }, [])

  if (loading || isChecking) {
    return <div><Loading/></div>
  }

  return user ? element : <Navigate to="/" />
}

export default PrivateRoute