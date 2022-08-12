import { axios } from '@/lib/axios'

export const confirmUser = (data) => {
  return axios({
    method: 'post',
    url: '/api/public/auth/confirm',
    data,
  })
}
