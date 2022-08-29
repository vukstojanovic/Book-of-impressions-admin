import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getReviews = (queryParams) => {
  return axios.get(`/api/wapp/reviews${queryParams}`)
}

export const useGetReviewsQuery = (reviewSearchParams) => {
  return useQuery(['reviews', reviewSearchParams], () => getReviews(reviewSearchParams))
}
