import { axios } from '@/lib/axios'

export const registerUser = (data) => {
  return axios({ method: 'post', url: '/api/public/user', data })
}
