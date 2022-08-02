import { axios } from '@/lib/axios'

export const submitUserSettingForm = () => {
  return axios({
    method: 'patch',
    url: '/api/wapp/me',
  })
}
