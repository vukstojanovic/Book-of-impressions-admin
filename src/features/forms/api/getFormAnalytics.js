import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getFormAnalytics = ({ id }) => {
  return axios({ method: 'get', url: `/api/wapp/analytics/${id}` })
}

export const getFormAnalyticsAll = async (arr) => {
  const arrForFetching = arr.map((item) => getFormAnalytics({ id: item.id }))
  const result = await Promise.all(arrForFetching)
  return result
}

export const useGetFormAnalyticsAllQuery = (dependantQuery) => {
  return useQuery(['formAnalytics'], () => getFormAnalyticsAll(dependantQuery[0]), {
    enabled: !!dependantQuery,
  })
}
