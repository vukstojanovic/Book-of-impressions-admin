import { axios } from '@/lib/axios'

export const handleLogout = () => {
  return axios({ method: 'post', url: '/api/public/auth/logout' })
}
