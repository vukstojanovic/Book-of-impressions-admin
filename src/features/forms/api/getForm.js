import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getForm = ({ id }) => {
  return axios({ method: 'get', url: `/api/public/form/${id}` })
}

export const useGetForm = ({ id }) => {
  return useQuery(['form', id], () => getForm({ id }), { enabled: !!id })
}
