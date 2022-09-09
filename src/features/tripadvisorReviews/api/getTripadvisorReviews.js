import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getTripadvisorReviews = ({ uri }) => {
  console.log(encodeURIComponent(uri))
  return axios({
    method: 'GET',
    url: `api/wapp/reviews/hotel/${encodeURIComponent(uri)}`,
  })
}

export const useGetTripadvisorReviewsQuery = ({ uri }) => {
  return useQuery(['tripadvisorReviews', uri], () => getTripadvisorReviews({ uri }), {
    enabled: !!uri,
  })
}
