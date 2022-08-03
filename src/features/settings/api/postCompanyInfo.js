import { axios } from '@/lib/axios'

export const postCompanyInfo = (id, data) => {
  return axios({ method: 'patch', url: `/api/wapp/copmany/${id}`, data })
}
