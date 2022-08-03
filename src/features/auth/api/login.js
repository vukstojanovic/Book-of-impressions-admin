import { axios } from '@/lib/axios'

export const loginUser = (data) => {
  console.log(data)
  return axios({ method: 'post', url: '/api/public/auth/login', data })
}
