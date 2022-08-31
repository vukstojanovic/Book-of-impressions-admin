import { Row, Spin, Empty } from 'antd'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useGetReviewsQuery } from '../api/getReviews'

import { ReviewCard } from '@/components/reviewCard'
import { FilterComponent } from '@/components/filterComponent'

export const Reviews = () => {
  const location = useLocation()
  const decodedQueryParams = decodeURIComponent(location.search)
  const { data, isLoading, isError, error } = useGetReviewsQuery(decodedQueryParams)
  const { t } = useTranslation('Reviews')

  if (isLoading) {
    return (
      <>
        <FilterComponent hasName hasEmail hasRating hasAnswer hasFormType hasDate />
        <div style={{ marginTop: '20px' }}>
          <Spin size="large" />
        </div>
      </>
    )
  }

  if (!isLoading && data[0].length === 0) {
    return (
      <>
        <FilterComponent hasName hasEmail hasRating hasAnswer hasFormType hasDate />
        <Empty
          description={
            <span>
              <b>{t('no_results')}</b>
            </span>
          }
        />
      </>
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
