import { axios } from '@/lib/axios'

export const submitUserSettingForm = (data) => {
  return axios({
    method: 'patch',
    url: '/api/wapp/me',
    data,
  })
}
