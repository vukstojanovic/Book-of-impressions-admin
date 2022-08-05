import { useRoutes } from 'react-router-dom'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

import storage from '@/utils/storage'

export const AppRoutes = () => {
  const auth = storage.get('access_token') && storage.get('refresh_token')

  // const auth = true
  const routes = auth ? protectedRoutes : publicRoutes

  const element = useRoutes([...routes])

  return <>{element}</>
}
