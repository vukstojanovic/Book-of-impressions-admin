import { Row, Col, Card, Typography, Rate, Spin, Statistic } from 'antd'
import { useTranslation } from 'react-i18next'

import { useGetGoogleReviewsQuery } from '../api/getGoogleReviews'
import { SingleReview } from '../components/SingleReview'

export const GoogleReviews = () => {
  const currentLocationId = 'ChIJUfDPCbJ6WkcRd7fUAGRPUFI'
  const { data, isLoading } = useGetGoogleReviewsQuery(currentLocationId)
  const { t } = useTranslation('GoogleReviews')

  if (isLoading) {
    return <Spin />
  }

  return (
    <div>
      {data && (
        <>
          <Typography.Title level={2} style={{ padding: '0px 20px', marginBottom: '20px' }}>
            {data?.name}
          </Typography.Title>
          <Row justify="space-between" style={{ marginBottom: '50px' }}>
            <Col xs={24} lg={12}>
              <Card style={{ textAlign: 'center', width: 'fit-content' }}>
                <Statistic
                  title={t('rating')}
                  value={data?.rating}
                  valueStyle={{ fontSize: '50px' }}
                />
                <Rate allowHalf disabled defaultValue={data?.rating} style={{ fontSize: '35px' }} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <iframe
                height={300}
                style={{ width: '100%' }}
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  import.meta.env.VITE_APP_GOOGLE_MAPS_KEY
                }&q=place_id:${currentLocationId}`}
                frameBorder={0}
              ></iframe>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            {data?.reviews?.map((review, index) => {
              return (
                <Col key={`googleReview-${index}`} xs={24} lg={12}>
                  <SingleReview {...review} />
                </Col>
              )
            })}
          </Row>
        </>
      )}
    </div>
  )
}
