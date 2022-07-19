import { axios } from '@/lib/axios'

export const loginUser = () => {
  console.log('login user')

  const data = {}

  return axios({ method: 'post', url: '/auth/login', data })
}

export const registerUser = (data) => {
  return axios({ method: 'post', url: '/api/public/user' }, data)
}
