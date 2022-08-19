import { Row, Spin } from 'antd'
// import { useTranslation } from 'react-i18next'

import { useGetReviewsQuery } from '../api/getReviews'

import { ReviewCard } from '@/components/reviewCard'
import { FilterComponent } from '@/components/filterComponent'
import { useFilterBySearchParams } from '@/utils/useFilterBySearchParams'

export const Reviews = () => {
  const { data, isLoading, isError, error } = useGetReviewsQuery()
  const filteredData = useFilterBySearchParams(isLoading ? [] : data[0], 'reviewName')

  // const { t } = useTranslation('Reviews')

  // const { Title } = Typography

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
        {/* <Title>{t('reviews')}</Title> */}
        <FilterComponent hasEmail hasRating hasAnswer hasType hasDate />
        <Row style={{ gap: 16 }}>
          {filteredData?.map((review) => {
            return <ReviewCard key={review.id} {...review} />
          })}
        </Row>
      </>
    )
  )
}
