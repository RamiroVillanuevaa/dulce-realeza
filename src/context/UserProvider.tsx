import { useState } from 'react'
import type { ReactNode } from 'react'
import { UserContext } from './UserContext'
import type { User } from '../types'

const CLAVE_STORAGE = 'antisocial-usuario'

interface UserProviderProps {
  children: ReactNode
}

function UserProvider({ children }: UserProviderProps) {
  const [usuario, setUsuario] = useState<User | null>(() => {
    const guardado = localStorage.getItem(CLAVE_STORAGE)
    return guardado ? JSON.parse(guardado) : null
  })

  function login(usuarioLogueado: User) {
    setUsuario(usuarioLogueado)
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuarioLogueado))
  }

  function logout() {
    setUsuario(null)
    localStorage.removeItem(CLAVE_STORAGE)
  }

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
