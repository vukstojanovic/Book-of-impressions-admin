import { DatePicker, Form, Col, Row, Space, Statistic, Typography, Spin, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { PrinterFilled } from '@ant-design/icons'

import { useGetAnalytics } from './api/getAnalytics'
import { ChartRow } from './ChartRow'

import { useSelectDate } from '@/hooks/useSelectDate'
import { SelectDateRange } from '@/components/buttons'
import { ChartPie } from '@/components/charts'
import { ChartBar } from '@/components/charts'

const Dashboard = () => {
  const [form] = Form.useForm()
  const [selectDateRange, state] = useSelectDate()

  const { data, isLoading } = useGetAnalytics({
    dateRange: { dateFrom: state.dateFrom, dateTo: state.dateTo },
  })

  const { Paragraph } = Typography
  const { t } = useTranslation('Charts')

  const onDateRangeChange = (values) => {
    selectDateRange({ values, form })
  }

  useEffect(() => {
    form.setFieldsValue({ selectedDateRange: 'today' })
    selectDateRange({ values: [{ value: 'today' }], form })
  }, [])

  const anonymousReviewPercentage = (data?.without_name / data?.totalND) * 100 || 0
  const reviewPercentage = (data?.total / data?.totalND) * 100 || 0

  console.log(data)
  if (isLoading) {
    return (
      <Row align="middle" justify="center" style={{ minHeight: '30vh' }}>
        <Spin size="large" />
      </Row>
    )
  }

  return (
    <Col
      className="print-page"
      style={{ background: 'white', padding: '24px', borderRadius: '8px' }}
    >
      <Typography.Paragraph className="print-date-text">
        {form.getFieldValue('selectedDateRange') === 'today'
          ? `${dayjs().format('DD.MM.YYYY')}`
          : `${dayjs(state.dateFrom).format('DD.MM.YYYY')} - ${dayjs(state.dateTo)
              .subtract(1, 'day')
              .format('DD.MM.YYYY')}`}
      </Typography.Paragraph>
      <Form onFieldsChange={onDateRangeChange} form={form}>
        <Row justify="space-between">
          <Row gutter={16}>
            <Col>
              <SelectDateRange />
            </Col>

            {state.custom && (
              <Col>
                <Form.Item name="pickedDate">
                  <DatePicker.RangePicker style={{ maxWidth: '250px' }} />
                </Form.Item>
              </Col>
            )}
          </Row>
          <Button
            onClick={() => window.print()}
            style={{ justifySelf: 'flex-end', display: 'flex' }}
          >
            <PrinterFilled />
          </Button>
        </Row>
      </Form>
      <Row
        className="top-charts"
        justify="space-around"
        gutter={50}
        align="middle"
        style={{
          backgroundColor: '#f0f2f5',
          margin: '15px 0 0',
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
            value={data?.total}
            valueStyle={{ textAlign: 'center', padding: '1rem 0', color: '#1b4979' }}
          />
          <Paragraph>
            {reviewPercentage.toFixed(2)}% {t('total_reviews')}
          </Paragraph>
        </Col>
        <Col
          className="chart"
          xs={{ span: 20 }}
          sm={{ span: 20 }}
          md={{ span: 10 }}
          xxl={{ span: 6 }}
        >
          {data?.total_negative && data?.total_positive === '0' ? (
            <Paragraph style={{ textAlign: 'center' }}>No Data</Paragraph>
          ) : (
            <ChartPie data={!isLoading && data} halfPie />
          )}
        </Col>
        <Col
          className="chart"
          xs={{ span: 20 }}
          sm={{ span: 20 }}
          md={{ span: 10 }}
          xxl={{ span: 6 }}
        >
          <ChartBar data={data?.byType} />
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
            value={data?.without_name}
            valueStyle={{ textAlign: 'center', padding: '1rem 0', color: '#1b4979' }}
          />
          <Paragraph>
            {anonymousReviewPercentage.toFixed(2)}% {t('total_reviews')}
          </Paragraph>
        </Col>
      </Row>
      <Space
        className="three-charts"
        direction="vertical"
        size={30}
        style={{ width: '100%', marginTop: '30px' }}
      >
        <ChartRow ratingType={'Rating'} ratingData={data?.rating}>
          <ChartBar data={data?.rating} />
        </ChartRow>
        <ChartRow ratingType={'Ratings'} ratingData={data?.ratings}>
          <ChartBar data={data?.ratings} />
        </ChartRow>
        <ChartRow ratingType={'Answer'} ratingData={data?.answer}>
          {data?.total_negative && data?.total_positive === '0' ? (
            <Paragraph style={{ textAlign: 'center' }}>No Data</Paragraph>
          ) : (
            <ChartPie data={data?.answer} />
          )}
        </ChartRow>
      </Space>
    </Col>
  )
}

export default Dashboard
