import { Col, Row, Select, Space, Statistic } from 'antd'

import { ChartPie } from '@/components/charts/ChartPie'
import { ChartBar } from '@/components/charts/ChartBar'

const { Option } = Select

const Dashboard = () => {
  return (
    <>
      <Row justify="space-between" className="SELECT Date for statistics">
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
      <Row justify="space-around" align="middle" className="GENERAL SECTION">
        <Col
          style={{
            marginTop: '16px',
            border: '1px solid black',
            borderRadius: '10px',
            padding: '7px',
          }}
        >
          <Statistic title={'Review Count'} value={654} valueStyle={{ textAlign: 'center' }} />
          <p style={{ marginTop: '16px' }}>12% of total Reviews</p>
        </Col>
        <Col>
          <ChartPie />
        </Col>
        <Col>
          <ChartBar />
        </Col>
        <Col>
          <Statistic title={'Anonymous Reviews'} value={3642} />
          <p>90% of Total Reviews</p>
        </Col>
      </Row>
      <Space direction="vertical" size={50}>
        <Row className="Rating Type">
          <Col>Rating</Col>
          <Col>
            <ChartBar />
          </Col>
        </Row>
        <Row className="Ratings Type">
          <Col>Ratings</Col>
          <Col>
            <ChartBar />
          </Col>
        </Row>
        <Row className="Answer Type">
          <Col>Answer</Col>
          <Col>
            <ChartBar />
          </Col>
        </Row>
      </Space>
    </>
  )
}

export default Dashboard
