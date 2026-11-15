import { createContext } from 'react'
import type { User } from '../types'

export interface UserContextType {
  usuario: User | null
  login: (usuario: User) => void
  logout: () => void
}

export const UserContext = createContext<UserContextType>({
  usuario: null,
  login: () => {},
  logout: () => {},
})
