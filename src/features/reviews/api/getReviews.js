import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getReviews = () => {
  return axios.get('/api/wapp/reviews')
}

export const useGetReviewsQuery = () => {
  return useQuery(['reviews'], getReviews)
}
