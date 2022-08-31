import { DatePicker, Form, Col, Row, Select, Space, Statistic, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useReducer, useEffect } from 'react'
import * as dayjs from 'dayjs'
import * as isLeapYear from 'dayjs/plugin/isLeapYear'

import { useGetAnalytics } from './api/getAnalytics'
import { ChartRow } from './ChartRow'

import { ChartPie } from '@/components/charts/ChartPie'
import { ChartBar } from '@/components/charts/ChartBar'
const { Option } = Select

const initialState = { dateFrom: '', dateTo: '', custom: false }

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'from_to':
      if (!payload.dateFrom || !payload.dateTo) {
        return { ...state }
      }
      return {
        ...state,
        dateFrom: payload.dateFrom,
        dateTo: payload.dateTo,
      }
    case 'changeDate':
      return {
        ...state,
        dateFrom: payload.dateFrom,
        dateTo: payload.dateTo,
        custom: false,
      }
    case 'custom':
      return {
        ...state,
        custom: true,
      }
    default:
      return state
  }
}

const Dashboard = () => {
  const [form] = Form.useForm()

  const [state, dispatch] = useReducer(reducer, initialState)
  const { data } = useGetAnalytics({
    dateRange: { dateFrom: state.dateFrom, dateTo: state.dateTo },
  })

  console.log(data)
  const { Paragraph } = Typography
  const { t } = useTranslation('Charts')
  const setTargetDate = (number, isMonth) => {
    if (isMonth) {
      return dayjs().subtract(number, 'month').format('YYYY-MM-DD')
    }
    return dayjs().subtract(number, 'day').format('YYYY-MM-DD')
  }
  const onDateRangeChange = (values) => {
    const value = values[0].value
    const today = dayjs().format('YYYY-MM-DD')
    console.log(isLeapYear)
    if (value !== 'custom') {
      form.resetFields(['pickedDate'])
    }
    switch (value) {
      case 'today':
        dispatch({
          type: 'changeDate',
          payload: { dateFrom: today, dateTo: today, selectDateValue: value },
        })
        break
      case 'last_day':
        dispatch({
          type: 'changeDate',
          payload: {
            dateFrom: setTargetDate(1),
            dateTo: today,
          },
        })
        break
      case 'last_3_days':
        dispatch({
          type: 'changeDate',
          payload: {
            dateFrom: setTargetDate(3),
            dateTo: today,
          },
        })
        break
      case 'last_week':
        dispatch({
          type: 'changeDate',
          payload: {
            dateFrom: setTargetDate(7),
            dateTo: today,
          },
        })
        break
      case 'last_3_weeks':
        dispatch({
          type: 'changeDate',
          payload: {
            dateFrom: setTargetDate(21),
            dateTo: today,
          },
        })
        break
      case 'last_month':
        dispatch({
          type: 'changeDate',
          payload: {
            dateFrom: setTargetDate(1, 'month'),
            dateTo: today,
          },
        })
        break
      case 'custom':
        dispatch({ type: 'custom' })
        break
      default:
        dispatch({
          type: 'from_to',
          payload: {
            dateFrom: value ? dayjs(value[0]?._d).format('YYYY-MM-DD') : '',
            dateTo: value ? dayjs(value[1]?._d).format('YYYY-MM-DD') : '',
          },
        })
        break
    }
  }

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD')
    form.setFieldsValue({ selectedDateRange: 'today' })
    dispatch({
      type: 'changeDate',
      payload: { dateFrom: today, dateTo: today },
    })
  }, [])

  const halfPieChartData = [
    { name: 'positive', value: data?.total_positive === '0' ? '1' : data?.total_positive },
    { name: 'negative', value: data?.total_negative === '0' ? '1' : data?.total_negative },
  ]
  const anonymousReviewPercentage = (data?.withoutname / data?.total) * 100 || 0
  const reviewPercentage = (data?.countOfReviews / data?.totalReviews) * 100 || 0
  if (!data) return null
  return (
    <Col style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <Form onFieldsChange={onDateRangeChange} form={form}>
        <Row gutter={16}>
          <Col>
            <Form.Item name="selectedDateRange">
              <Select style={{ minWidth: '200px' }}>
                <Option value="today">{t('today')}</Option>
                <Option value="last_day">{t('last_day')}</Option>
                <Option value="last_3_days">{t('last_3_days')}</Option>
                <Option value="last_week">{t('last_week')}</Option>
                <Option value="last_3_weeks">{t('last_3_weeks')}</Option>
                <Option value="last_month">{t('last_month')}</Option>
                <Option value="custom">{t('custom')}</Option>
              </Select>
            </Form.Item>
          </Col>
          {state.custom && (
            <Col>
              <Form.Item name="pickedDate">
                <DatePicker.RangePicker style={{ maxWidth: '250px' }} />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>

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
          <Paragraph>
            {reviewPercentage.toFixed(2)}% {t('total_reviews')}
          </Paragraph>
        </Col>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 10 }} xxl={{ span: 6 }}>
          <ChartPie data={halfPieChartData} halfPie />
        </Col>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 10 }} xxl={{ span: 6 }}>
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
            value={data?.withoutname}
            valueStyle={{ textAlign: 'center', padding: '1rem 0', color: '#1b4979' }}
          />
          <Paragraph>
            {anonymousReviewPercentage.toFixed(2)}% {t('total_reviews')}
          </Paragraph>
        </Col>
      </Row>
      <Space direction="vertical" size={30} style={{ width: '100%', marginTop: '30px' }}>
        <ChartRow ratingType={'Rating'} ratingData={data?.rating}>
          <ChartBar data={data?.rating} />
        </ChartRow>
        <ChartRow ratingType={'Ratings'} ratingData={data?.ratings}>
          <ChartBar data={data?.ratings} />
        </ChartRow>
        <ChartRow ratingType={'Answer'} ratingData={data?.answer}>
          {/* <ChartPie data={data?.answer} /> */}
        </ChartRow>
      </Space>
    </Col>
  )
}

export default Dashboard
