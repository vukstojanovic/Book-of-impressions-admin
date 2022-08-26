import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getGoogleReviews = ({ id }) => {
  return axios({
    method: 'GET',
    url: `api/wapp/reviews/google?placeId=${id}`,
  })
}

export const useGetGoogleReviewsQuery = (id) => {
  return useQuery(['googleReviews', id], () => getGoogleReviews({ id }))
}
