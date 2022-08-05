import { axios } from '@/lib/axios'

export const refreshToken = () => {
  return axios({
    method: 'post',
    url: '/api/public/auth/refresh',
  })
}
