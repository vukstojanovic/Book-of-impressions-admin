import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getFormReviews = ({ id }) => {
  return axios.get(`/api/wapp/reviews/${id}`)
}

export const useGetFormReviews = ({ id }) => {
  return useQuery(['reviews', id], () => getFormReviews({ id }))
}
