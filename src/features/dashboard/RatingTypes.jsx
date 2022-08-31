import { useTranslation } from 'react-i18next'
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Col, Rate, Row, Typography } from 'antd'

const RatingTypes = ({ ratingType, ratingData }) => {
  const { t } = useTranslation('Charts')

  const sortedRatingData = ratingData && Object.entries(ratingData).sort((a, b) => b[0] - a[0])
  return (
    <>
      {ratingType === 'Answer' ? (
        <Col
          style={{ minWidth: '215px' }}
          xl={{ span: 4 }}
          md={{ span: 9 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Typography.Title level={3}>{t(`${ratingType.toLowerCase()}`)}</Typography.Title>
          <Row justify="start" gutter={10} style={{ padding: '20px 0 0 0' }}>
            <Col style={{ textAlign: 'center' }}>
              <LikeOutlined
                style={{
                  fontSize: '24px',
                  color: 'green',
                  backgroundColor: '#76d1a4',
                  padding: '24px',
                  borderRadius: '100%',
                }}
              />
              <p>{ratingData?.positive}</p>
            </Col>
            <Col style={{ textAlign: 'center' }}>
              <DislikeOutlined
                style={{
                  fontSize: '24px',
                  color: 'red',
                  backgroundColor: '#ff8d85',
                  padding: '24px',
                  borderRadius: '100%',
                }}
              />
              <p>{ratingData?.negative}</p>
            </Col>
          </Row>
        </Col>
      ) : (
        <Col
          style={{ minWidth: '215px' }}
          xl={{ span: 4 }}
          md={{ span: 9 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Typography.Title level={3}>{t(`${ratingType.toLowerCase()}`)}</Typography.Title>
          {sortedRatingData &&
            sortedRatingData.map(([key, value]) => {
              return (
                <Row key={key} justify="start" align="middle" gutter={20}>
                  <Col>
                    <Rate defaultValue={key} disabled />
                  </Col>
                  <Col>{Number(value)}</Col>
                </Row>
              )
            })}
        </Col>
      )}
    </>
  )
}

export default RatingTypes
