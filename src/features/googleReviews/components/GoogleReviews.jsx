import { Row, Col, Card, Typography, Rate, Spin, Statistic, Empty, Select } from 'antd'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/sr'

import { useGetGoogleReviewsQuery } from '../api/getGoogleReviews'
import { SingleReview } from '../components/SingleReview'

import { useGetCompanyInfo } from '@/features/settings/api/getCompanyInfo'

export const GoogleReviews = () => {
  const { data: companyData, isLoading: isCompanyDataLoading } = useGetCompanyInfo()
  const [currentLocationId, setCurrentLocationId] = useState('')
  const { data } = useGetGoogleReviewsQuery(currentLocationId)
  const { t, i18n } = useTranslation('GoogleReviews')
  dayjs.locale(i18n.language)
  dayjs.extend(relativeTime)

  function handleLocationIdChange(value) {
    setCurrentLocationId(value)
  }

  useEffect(() => {
    if (!isCompanyDataLoading) setCurrentLocationId(companyData.meta.google_place_ids[0])
  }, [isCompanyDataLoading])

  return (
    <div>
      {!isCompanyDataLoading ? (
        <Row align="middle" wrap style={{ marginBottom: '30px', padding: '0px 20px' }}>
          <Typography.Paragraph style={{ margin: 0, marginRight: '10px' }}>
            {t('select_google_id')}{' '}
          </Typography.Paragraph>
          <Select
            defaultValue={companyData.meta.google_place_ids[0]}
            style={{ maxWidth: '300px', minWidth: '150px' }}
            onChange={handleLocationIdChange}
          >
            {companyData.meta.google_place_ids.map((singleId) => {
              return (
                <Select.Option key={singleId} value={singleId}>
                  {singleId}
                </Select.Option>
              )
            })}
          </Select>
        </Row>
      ) : (
        <Spin style={{ width: '100%', marginBottom: '20px' }} />
      )}
      {data ? (
        <>
          <Typography.Title level={2} style={{ padding: '0px 20px', marginBottom: '20px' }}>
            {data?.name}
          </Typography.Title>
          <Row justify="space-between" style={{ marginBottom: '50px' }}>
            <Col xs={24} lg={12}>
              <Card style={{ textAlign: 'center', width: 'fit-content' }}>
                <Statistic
                  title={t('rating')}
                  value={data?.rating}
                  valueStyle={{ fontSize: '50px' }}
                />
                <Rate allowHalf disabled defaultValue={data?.rating} style={{ fontSize: '35px' }} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <iframe
                height={300}
                style={{ width: '100%' }}
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  import.meta.env.VITE_APP_GOOGLE_MAPS_KEY
                }&q=place_id:${currentLocationId}`}
                frameBorder={0}
              ></iframe>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            {data?.reviews?.map((review, index) => {
              return (
                <Col key={`googleReview-${index}`} xs={24} lg={12}>
                  <SingleReview {...review} />
                </Col>
              )
            })}
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
        </>
      ) : (
        <Spin style={{ width: '100%' }} />
      )}
    </div>
  )
}
