import { Card, Col, Rate, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export const ReviewCard = ({ review }) => {
  const { comment, createdDate, id, rating, reviewName } = review
  const { Text, Paragraph } = Typography

  const { t } = useTranslation('Reviews')

  return (
    <Col key={id} xs={{ span: 24 }} lg={{ span: 20 }} xl={{ span: 17 }}>
      <Card hoverable bordered type="inner" style={{ borderRadius: '8px', width: '100%' }}>
        <Row justify="space-between" wrap={true} align="middle" style={{ marginBottom: '20px' }}>
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
}
