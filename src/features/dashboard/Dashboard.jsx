import { Col, Row, Select, Space, Statistic, Typography } from 'antd'

import { data as BarRatingData } from '../../components/charts/barRatingDummydata'
import { data as AnswerRatingData } from '../../components/charts/answerBarRatingDummydata'
import { data as DummyData } from '../../components/charts/barDummyData'
import { data as TopPieData } from '../../components/charts/pieDummyData'

import { ChartRow } from './ChartRow'

import { ChartPie } from '@/components/charts/ChartPie'
import { ChartBar } from '@/components/charts/ChartBar'
const { Option } = Select

const Dashboard = () => {
  const { Paragraph } = Typography
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
      <Row
        justify="space-around"
        gutter={50}
        align="middle"
        style={{
          backgroundColor: '#f0f2f5',
          margin: '30px 0 0',
          borderRadius: '8px',
          paddingBottom: '15px',
        }}
      >
        <Col
          xs={{ span: 20 }}
          sm={{ span: 20 }}
          md={{ span: 10 }}
          xxl={{ span: 4 }}
          style={{
            marginTop: '16px',
            borderRadius: '10px',
            padding: '1rem',
            backgroundColor: 'white',
          }}
        >
          <Statistic
            title={'Review Count'}
            value={654}
            valueStyle={{ textAlign: 'center', padding: '1rem 0', color: '#1b4979' }}
          />
          <Paragraph>9% of total Reviews</Paragraph>
        </Col>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 10 }} xxl={{ span: 6 }}>
          <ChartPie data={TopPieData} halfPie />
        </Col>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 10 }} xxl={{ span: 6 }}>
          <ChartBar data={DummyData} />
        </Col>
        <Col
          xs={{ span: 20 }}
          sm={{ span: 20 }}
          md={{ span: 10 }}
          xxl={{ span: 4 }}
          style={{
            marginTop: '16px',
            borderRadius: '10px',
            padding: '1rem',
            backgroundColor: 'white',
          }}
        >
          <Statistic
            title={'Anonymous Reviews'}
            value={3642}
            valueStyle={{ textAlign: 'center', padding: '1rem 0', color: '#1b4979' }}
          />
          <Paragraph>90% of Total Reviews</Paragraph>
        </Col>
      </Row>
      <Space direction="vertical" size={30} style={{ width: '100%', marginTop: '30px' }}>
        <ChartRow ratingType={'Rating'} ratingData={BarRatingData}>
          <ChartBar data={BarRatingData} />
        </ChartRow>
        <ChartRow ratingType={'Ratings'} ratingData={BarRatingData}>
          <ChartBar data={BarRatingData} />
        </ChartRow>
        <ChartRow ratingType={'Answer'} ratingData={AnswerRatingData}>
          <ChartPie data={AnswerRatingData} />
        </ChartRow>
      </Space>
    </Col>
  )
}

export default Dashboard
