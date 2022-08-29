import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getFormReviews = ({ id, searchQuery }) => {
  return axios.get(`/api/wapp/reviews/${id}${searchQuery}`)
}

export const useGetFormReviews = (id, searchQuery) => {
  return useQuery(['formReviews', searchQuery], () => getFormReviews({ id, searchQuery }))
}
