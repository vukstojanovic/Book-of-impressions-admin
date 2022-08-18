import { Row, Typography, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

import { useGetReviewsQuery } from '../api/getReviews'

import { ReviewCard } from '@/components/reviewCard'

export const Reviews = () => {
  const { data, isLoading, isError, error } = useGetReviewsQuery()

  const { t } = useTranslation('Reviews')
  
  const { Title } = Typography

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
        <Title>{t('reviews')}</Title>
        <Row style={{ gap: 16 }}>
          {data[0]?.map((review) => {
            return <ReviewCard key={review.id} review={review} />
          })}
        </Row>
      </>
    )
  )
}
