import { Col, Row, Select, Space, Statistic, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('Charts')
  return (
    <Col style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <Row>
        <Select defaultValue={'today'} style={{ minWidth: '200px' }}>
          <Option value="today">{t('today')}</Option>
          <Option value="last-day">{t('last_day')}</Option>
          <Option value="last-3-days">{t('last_3_days')}</Option>
          <Option value="last-week">{t('last_week')}</Option>
          <Option value="last-2-weeks">{t('last_3_weeks')}</Option>
          <Option value="last-month">{t('last_month')}</Option>
          <Option value="custom">{t('custom')}</Option>
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
            title={t('review_count')}
            value={654}
            valueStyle={{ textAlign: 'center', padding: '1rem 0', color: '#1b4979' }}
          />
          <Paragraph>9% {t('total_reviews')}</Paragraph>
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
            title={t('anonymous')}
            value={3642}
            valueStyle={{ textAlign: 'center', padding: '1rem 0', color: '#1b4979' }}
          />
          <Paragraph>90% {t('total_reviews')}</Paragraph>
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
