import { axios } from '@/lib/axios'

export const loginUser = (data) => {
  return axios({
    method: 'post',
    url: '/api/public/auth/login',
    data,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': 'https://bookquantox.herokuapp.com/',
      'Content-Type': 'application/json',
    },
  })
}

export const registerUser = (data) => {
  return axios({ method: 'post', url: '/api/public/user', data })
}
