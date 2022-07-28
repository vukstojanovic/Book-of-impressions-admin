import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getForms = () => {
  return axios({ method: 'get', url: '/api/wapp/forms' })
}

export const useForms = () => {
  return useQuery('allForms', getForms)
}
