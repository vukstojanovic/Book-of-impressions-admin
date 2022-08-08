import { Card, Rate, Row, Col, Typography, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

import { useGetReviewsQuery } from '../api/getReviews'

export const Reviews = () => {
  const { data, isSuccess, isLoading } = useGetReviewsQuery()

  const { t } = useTranslation('Reviews')
  const { Text, Paragraph, Title } = Typography

  if (isLoading) {
    return (
      <div style={{ marginTop: '20px' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (isSuccess) {
    return (
      <>
        <Title>{t('reviews')}</Title>
        <Row style={{ gap: 16 }}>
          {data[0]?.map((review) => {
            const { comment, createdDate, id, rating, reviewName } = review
            return (
              <Col key={id} xs={{ span: 24 }} lg={{ span: 20 }} xl={{ span: 17 }}>
                <Card
                  hoverable
                  bordered
                  type="inner"
                  style={{ borderRadius: '8px', width: '100%' }}
                >
                  <Row
                    justify="space-between"
                    wrap={true}
                    align="middle"
                    style={{ marginBottom: '20px' }}
                  >
                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                      <Text style={{ fontWeight: 'bold' }}>{reviewName}</Text>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                      <Text>{dayjs(createdDate).format('DD/MM/YYYY')}</Text>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 8 }}>
                      <Rate disabled allowHalf defaultValue={rating} />
                    </Col>
                  </Row>

                  <Paragraph
                    ellipsis={{
                      expandable: true,
                      rows: 3,
                      symbol: t('readMore') + '...',
                    }}
                    title="review description"
                  >
                    {comment}
                  </Paragraph>
                </Card>
              </Col>
            )
          })}
        </Row>
      </>
    )
  }
}
