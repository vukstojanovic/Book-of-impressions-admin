import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getGoogleReviews = () => {
  return axios({
    method: 'GET',
    url: 'api/wapp/reviews/google?placeId=ChIJUfDPCbJ6WkcRd7fUAGRPUFI',
  })
}

export const useGetGoogleReviewsQuery = () => {
  return useQuery(['googleReviews'], getGoogleReviews)
}
