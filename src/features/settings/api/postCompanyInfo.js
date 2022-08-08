import { axios } from '@/lib/axios'

export const updateCompanyInfo = (id, data) => {
  return axios({ method: 'patch', url: `/api/wapp/company/${id}`, data })
}
