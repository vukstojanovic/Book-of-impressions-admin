import { Row, Spin } from 'antd'
import { useLocation } from 'react-router-dom'

import { useGetReviewsQuery } from '../api/getReviews'

import { ReviewCard } from '@/components/reviewCard'
import { FilterComponent } from '@/components/filterComponent'

export const Reviews = () => {
  const location = useLocation()
  const decodedQueryParams = decodeURIComponent(location.search)
  const { data, isLoading, isError, error } = useGetReviewsQuery(decodedQueryParams)

  if (isLoading) {
    return (
      <div style={{ marginTop: '20px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (isError) {
    return <div style={{ marginTop: '20px' }}>{error.message}</div>
  }

  return (
    data && (
      <>
        <FilterComponent hasName hasEmail hasRating hasAnswer hasFormType hasDate />
        <Row style={{ gap: 16 }}>
          {data[0]?.map((review) => {
            return <ReviewCard key={review.id} {...review} />
          })}
        </Row>
      </>
    )
  )
}
