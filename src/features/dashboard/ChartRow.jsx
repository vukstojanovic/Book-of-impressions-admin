import { Row, Col } from 'antd'

import RatingTypes from './RatingTypes'

export const ChartRow = ({ children, ratingType, ratingData }) => {
  return (
    <Row
      className="chart-row"
      style={{ backgroundColor: '#f0f2f5', borderRadius: '8px', padding: '1rem' }}
    >
      <RatingTypes ratingType={ratingType} data={ratingData} ratingData={ratingData} />
      <Col id="chart-row-graph" sm={{ span: 22 }} md={{ span: 12 }} xl={{ span: 10 }}>
        {children}
      </Col>
    </Row>
  )
}
