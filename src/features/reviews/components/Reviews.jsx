import { Card, Rate, Row, Col, Typography, Spin } from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

import { useGetReviewsQuery } from '../api/getReviews'

import style from './Reviews.module.css'

export const Reviews = () => {
  const { data, isLoading, isError, error } = useGetReviewsQuery()

  const { t } = useTranslation('Reviews')
  const { Paragraph, Title } = Typography

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
            const { answer, comment, createdDate, id, rating, ratings, reviewName } = review
            return (
              <Col key={id} xs={{ span: 24 }} lg={{ span: 20 }} xl={{ span: 17 }}>
                <Card
                  hoverable
                  bordered
                  type="inner"
                  style={{ borderRadius: '8px', width: '100%' }}
                >
                  <div className={style.cardWrapper}>
                    <div className={style.name}>{reviewName}</div>
                    <div className={style.date}>{dayjs(createdDate).format('DD/MM/YYYY')}</div>
                    {answer && (
                      <div className={style.formType}>
                        <LikeOutlined style={{ fontSize: '24px', color: 'green' }} />
                      </div>
                    )}
                    {rating && (
                      <div className={style.formType}>
                        <Rate disabled allowHalf defaultValue={rating} />
                      </div>
                    )}
                    {ratings && (
                      <div className={style.formType}>
                        {ratings.map((rating, i) => {
                          return <Rate key={i} defaultValue={rating || 0} allowHalf disabled />
                        })}
                      </div>
                    )}

                    <div className={style.comment}>
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
                    </div>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      </>
    )
  )
}
