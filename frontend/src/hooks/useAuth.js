import { useContext } from 'react'
import { AuthContext } from '../context/authContextValue.js'

export const useAuth = () => useContext(AuthContext)
