import { useContext } from 'react'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

interface RutaProtegidaProps {
  children: ReactNode
}

function RutaProtegida({ children }: RutaProtegidaProps) {
  const { usuario } = useContext(UserContext)

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default RutaProtegida
