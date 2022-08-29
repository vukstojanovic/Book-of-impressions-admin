import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getFormReviews = ({ searchQuery }) => {
  return axios.get(`/api/wapp/reviews/${searchQuery}`)
}

export const useGetFormReviews = ({ searchQuery }) => {
  return useQuery(['formReviews', searchQuery], () => getFormReviews({ searchQuery }))
}
