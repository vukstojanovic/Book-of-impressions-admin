import { axios } from '@/lib/axios'

export const getNewAccessToken = () => {
  return axios({
    method: 'post',
    url: '/api/public/auth/refresh',
  })
}
