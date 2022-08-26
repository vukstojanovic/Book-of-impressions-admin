import { useTranslation } from 'react-i18next'
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Col, Rate, Row, Typography } from 'antd'

const RatingTypes = ({ ratingType, data, ratingData }) => {
  const { t } = useTranslation('Charts')
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
              <p>{data[0].value}</p>
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
              <p>{data[1].value}</p>
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
          <Row justify="start" align="middle" gutter={20}>
            <Col>
              <Rate defaultValue={5} disabled />
            </Col>
            <Col>{ratingData[0]?.value}</Col>
          </Row>
          <Row justify="start" align="middle" gutter={20}>
            <Col>
              <Rate defaultValue={4} disabled />
            </Col>
            <Col>{ratingData[1]?.value}</Col>
          </Row>
          <Row justify="start" align="middle" gutter={20}>
            <Col>
              <Rate defaultValue={3} disabled />
            </Col>
            <Col>{ratingData[2]?.value}</Col>
          </Row>
          <Row justify="start" align="middle" gutter={20}>
            <Col>
              <Rate defaultValue={2} disabled />
            </Col>
            <Col>{ratingData[3]?.value}</Col>
          </Row>
          <Row justify="start" align="middle" gutter={20}>
            <Col>
              <Rate defaultValue={1} disabled />
            </Col>
            <Col>{ratingData[4]?.value}</Col>
          </Row>
        </Col>
      )}
    </>
  )
}

export default RatingTypes
