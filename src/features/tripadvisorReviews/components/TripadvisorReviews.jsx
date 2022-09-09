import { Card, Col, Empty, Form, Rate, Row, Select, Spin, Statistic, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useEffect } from 'react'

import { useGetTripadvisorReviewsQuery } from '../api/getTripadvisorReviews'

import { SingleReview } from './SingleReview'

import { useGetCompanyMeta } from '@/features/settings/api/getCompanyMeta'

export const TripadvisorReviews = () => {
  const { Option } = Select
  const { t } = useTranslation('TripadvisorReviews')

  const [tripadvisorUrl, setTripadvisorUrl] = useState()
  const { data: companyMeta, isLoading } = useGetCompanyMeta()
  const [form] = Form.useForm()

  const onValuesChange = (value) => {
    console.log(value)
    setTripadvisorUrl(value.urls)
    console.log(tripadvisorUrl)
  }
  const { data } = useGetTripadvisorReviewsQuery({ uri: tripadvisorUrl })

  /* const data = [] */

  console.log(data)
  useEffect(() => {
    if (companyMeta) {
      setTripadvisorUrl(companyMeta.tripadvisor_urls[0])
    }
  }, [companyMeta])

  if (isLoading)
    return (
      <Row align="middle" justify="center" style={{ minHeight: '30vh' }}>
        <Spin size="large" />
      </Row>
    )
  return (
    <>
      <Form
        initialValues={{ urls: companyMeta.tripadvisor_urls[0] }}
        form={form}
        onValuesChange={onValuesChange}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: t('error_formIds'),
            },
          ]}
          disabled
          label={t('label_tripadvisor_reviews')}
          name="urls"
        >
          <Select
            placeholder={t('label_tripadvisor_reviews')}
            allowClear
            style={{
              width: '100%',
            }}
          >
            {companyMeta.tripadvisor_urls.map((option, i) => {
              return (
                <Option value={option} key={i}>
                  {option.split('-').slice(-2)[0].split('_').join(' ')}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>{' '}
      <Typography.Title level={2} style={{ padding: '0px 20px', marginBottom: '20px' }}>
        {/* {data?.title} */}
      </Typography.Title>
      <Row justify="space-between" style={{ marginBottom: '50px' }}>
        <Col xs={24} lg={12}>
          <Card style={{ textAlign: 'center', width: 'fit-content' }}>
            <Statistic
              title={t('rating')}
              // value={data?.rating}
              valueStyle={{ fontSize: '50px' }}
            />
            <Rate allowHalf disabled defaultValue={2} style={{ fontSize: '35px' }} />
          </Card>
        </Col>{' '}
        <Row gutter={[10, 10]}>
          {data?.map((data) => (
            <SingleReview
              key={data.title}
              author_name={data.name}
              profile_photo_url={data.photo}
              time={data.date}
              text={data.content}
            />
          ))}
          {data && data[0]?.length === 0 && (
            <Empty
              style={{ margin: 'auto' }}
              description={
                <span>
                  <b>{t('no_results')}</b>
                </span>
              }
            />
          )}
        </Row>
      </Row>
    </>
  )
}
