import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getTripadvisorReviews = async ({ uri }) => {
  try {
    const tripAdvisor = await axios({
      method: 'GET',
      url: `api/wapp/reviews/hotel/${encodeURIComponent(uri)}`,
    })
    return tripAdvisor
  } catch (error) {
    return { error: error.response.status }
  }
}

export const useGetTripadvisorReviewsQuery = ({ uri }) => {
  return useQuery(['tripadvisorReviews', uri], () => getTripadvisorReviews({ uri }), {
    enabled: !!uri,
  })
}
