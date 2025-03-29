import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute() {
  const { user } = useAuth()

  if ( user && user.user && (!user || user.user.role !== "admin")) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute