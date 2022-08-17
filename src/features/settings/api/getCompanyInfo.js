import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getCompanyInfo = () => {
  return axios({
    method: 'get',
    url: `/api/wapp/company`,
  })
}

export const useGetCompanyInfo = () => {
  return useQuery(['company'], getCompanyInfo)
}
