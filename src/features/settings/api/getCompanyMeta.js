import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getCompanyMeta = () => {
  return axios({
    method: 'get',
    url: `/api/wapp/company-meta`,
  })
}

export const useGetCompanyMeta = () => {
  return useQuery(['company-meta'], getCompanyMeta)
}
