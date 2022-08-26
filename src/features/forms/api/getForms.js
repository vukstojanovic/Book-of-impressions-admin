import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getForms = (queryParams) => {
  return axios({ method: 'get', url: `/api/wapp/forms${queryParams}` })
}

export const useForms = (formSearchParams) => {
  return useQuery(['allForms', formSearchParams], () => getForms(formSearchParams))
}
