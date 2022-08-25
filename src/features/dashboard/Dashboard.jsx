import { Col, Row, Select, Space, Statistic } from 'antd'

import RatingTypes from './RatingTypes'

import { ChartPie } from '@/components/charts/ChartPie'
import { ChartBar } from '@/components/charts/ChartBar'

const { Option } = Select

const Dashboard = () => {
  return (
    <Col style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <Row>
        <Select defaultValue={'today'} style={{ minWidth: '140px' }}>
          <Option value="today">Today</Option>
          <Option value="last-day">Last day</Option>
          <Option value="last-3-days">Last 3 days</Option>
          <Option value="last-week">Last Week</Option>
          <Option value="last-2-weeks">Last 2 weeks</Option>
          <Option value="last-month">Last month</Option>
          <Option value="custom">Custom</Option>
        </Select>
      </Row>
      <Row justify="space-around" gutter={50} align="middle">
        <Col
          xs={{ span: 20 }}
          sm={{ span: 20 }}
          md={{ span: 10 }}
          xxl={{ span: 4 }}
          style={{
            marginTop: '16px',
            border: '1px solid black',
            borderRadius: '10px',
            padding: '7px',
          }}
        >
          <Statistic title={'Review Count'} value={654} valueStyle={{ textAlign: 'center' }} />
          <p style={{ marginTop: '16px' }}>9% of total Reviews</p>
        </Col>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 10 }} xxl={{ span: 6 }}>
          <ChartPie />
        </Col>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 10 }} xxl={{ span: 6 }}>
          <ChartBar />
        </Col>
        <Col
          xs={{ span: 20 }}
          sm={{ span: 20 }}
          md={{ span: 10 }}
          xxl={{ span: 4 }}
          style={{
            marginTop: '16px',
            border: '1px solid black',
            borderRadius: '10px',
            padding: '7px',
          }}
        >
          <Statistic
            title={'Anonymous Reviews'}
            value={3642}
            valueStyle={{ textAlign: 'center' }}
          />
          <p>90% of Total Reviews</p>
        </Col>
      </Row>
      <Space direction="vertical" size={50} style={{ width: '100%', marginTop: '30px' }}>
        <Row align="middle" className="Rating Type">
          <RatingTypes ratingType={'Rating'} />
          <Col sm={{ span: 22 }} md={{ span: 12 }} xl={{ span: 10 }}>
            <ChartBar />
          </Col>
        </Row>
        <Row align="middle" className="Ratings Type">
          <RatingTypes ratingType={'Ratings'} />
          <Col sm={{ span: 22 }} md={{ span: 12 }} xl={{ span: 10 }}>
            <ChartBar />
          </Col>
        </Row>
        <Row align="middle" className="Answer Type">
          <RatingTypes ratingType={'Answer'} />
          <Col sm={{ span: 22 }} md={{ span: 12 }} xl={{ span: 10 }}>
            <ChartBar />
          </Col>
        </Row>
      </Space>
    </Col>
  )
}

export default Dashboard
