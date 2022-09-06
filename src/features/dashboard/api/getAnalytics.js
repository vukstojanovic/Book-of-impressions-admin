import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'
export const getAnalytics = ({ dateRange }) => {
  console.log(dateRange)
  return axios({
    method: 'get',
    url: `api/wapp/analytics?dateFrom=${dateRange.dateFrom}&dateTo=${dateRange.dateTo}`,
  })
}

export const useGetAnalytics = ({ dateRange }) => {
  return useQuery(['analytics', dateRange], () => getAnalytics({ dateRange }), {
    enabled: !!dateRange.dateFrom || !!dateRange.dateTo,
  })
}
