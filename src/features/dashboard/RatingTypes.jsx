import { DislikeOutlined, LikeOutlined } from '@ant-design/icons'
import { Col, Rate, Row } from 'antd'

const RatingTypes = ({ ratingType }) => {
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
          <Row justify="center" gutter={10}>
            <Col>
              <LikeOutlined
                style={{
                  fontSize: '24px',
                  color: 'green',
                  backgroundColor: '#76d1a4',
                  padding: '24px',
                  borderRadius: '100%',
                }}
              />
            </Col>
            <Col>
              <DislikeOutlined
                style={{
                  fontSize: '24px',
                  color: 'red',
                  backgroundColor: '#cf5e5e',
                  padding: '24px',
                  borderRadius: '100%',
                }}
              />
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
          <p>{ratingType}</p>
          <Row justify="start" align="middle" gutter={20}>
            <Col>
              <Rate defaultValue={5} disabled />
            </Col>
            <Col>34</Col>
          </Row>
          <Row justify="start" align="middle" gutter={20}>
            <Col>
              <Rate defaultValue={4} disabled />
            </Col>
            <Col>158</Col>
          </Row>
          <Row justify="start" align="middle" gutter={20}>
            <Col>
              <Rate defaultValue={3} disabled />
            </Col>
            <Col>62</Col>
          </Row>
          <Row justify="start" align="middle" gutter={20}>
            <Col>
              <Rate defaultValue={2} disabled />
            </Col>
            <Col>13</Col>
          </Row>
          <Row justify="start" align="middle" gutter={20}>
            <Col>
              <Rate defaultValue={1} disabled />
            </Col>
            <Col>100000</Col>
          </Row>
        </Col>
      )}
    </>
  )
}

export default RatingTypes
