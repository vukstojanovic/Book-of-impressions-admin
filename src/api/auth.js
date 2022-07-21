import { axios } from '@/lib/axios'

export const loginUser = (data) => {
  return axios({ method: 'post', url: '/api/public/auth/login', data })
}

export const registerUser = (data) => {
  return axios({ method: 'post', url: '/api/public/user', data })
}
