import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getReports = () => {
  return axios({ method: 'get', url: '/api/wapp/reports' })
}

export const useReports = () => {
  return useQuery(['allReports'], getReports)
}
