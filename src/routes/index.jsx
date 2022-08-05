import { useRoutes } from 'react-router-dom'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

import { useAuth } from '@/providers/authProvider'

export const AppRoutes = () => {
  const auth = useAuth()

  const routes = auth.user ? protectedRoutes : publicRoutes

  const element = useRoutes([...routes])

  return <>{element}</>
}
