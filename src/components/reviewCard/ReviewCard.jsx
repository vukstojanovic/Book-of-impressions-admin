import { Card, Col, Rate, Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'

import style from './ReviewCard.module.css'

export const ReviewCard = ({ review }) => {
  const { answer, comment, createdDate, id, rating, ratings, reviewName } = review
  const { Paragraph } = Typography

  const { t } = useTranslation('Reviews')

  return (
    <Col key={id} xs={{ span: 24 }}>
      <Card hoverable bordered type="inner" style={{ borderRadius: '8px', width: '100%' }}>
        <div className={style.cardWrapper}>
          <div className={style.name}>{reviewName}</div>
          <div className={style.date}>{dayjs(createdDate).format('DD/MM/YYYY')}</div>
          {answer === null ? null : (
            <div className={style.formType}>
              {answer ? (
                <LikeOutlined style={{ fontSize: '24px', color: 'green' }} />
              ) : (
                <DislikeOutlined style={{ fontSize: '24px', color: 'red' }} />
              )}
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
}
