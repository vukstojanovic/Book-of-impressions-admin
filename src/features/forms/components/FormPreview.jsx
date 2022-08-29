import { Spin, Typography, Card, Tag, Row, Col, Divider } from 'antd'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { QrcodeOutlined } from '@ant-design/icons'

import { useGetForm } from '../api/getForm'
import { useGetFormReviews } from '../api/getFormReviews'

import QRCodeFormModal from './QRCodeFormModal'

import { ReviewCard } from '@/components/reviewCard'
import { EditButton } from '@/components/buttons/EditButton'
import { FilterComponent } from '@/components/filterComponent/FilterComponent'

export const FormPreview = () => {
  const {
    i18n: { language },
    t,
  } = useTranslation('Forms')

  const [param] = useSearchParams()
  const id = param.get('id')

  const location = useLocation()
  const searchQuery = location.search
  const { data: formData, isLoading: formIsLoading } = useGetForm({
    id,
  })
  const { data: formReviewData, isLoading: reviewIsLoading } = useGetFormReviews({
    id,
    searchQuery,
  })
  const [qrValue, setQrValue] = useState('asd')

  const [QRModalVisible, setQRModalVisible] = useState(false)
  const { Paragraph, Text, Title } = Typography

  if (formIsLoading || reviewIsLoading)
    return (
      <Row align="middle" justify="center" style={{ minHeight: '30vh' }}>
        <Spin size="large" />
      </Row>
    )

  return (
    <>
      <QRCodeFormModal
        formTitle={formData?.title}
        formId={formData?.id}
        qrValue={qrValue}
        setModalVisible={setQRModalVisible}
        modalVisible={QRModalVisible}
      />

      <EditButton linkTo={`/forms/edit?id=${id}`} />

      <Card style={{ borderRadius: '8px' }}>
        <Row gutter={16} align="middle" style={{ margin: '0 0 12px 0' }}>
          <Col>
            <Title level={3} strong style={{ margin: 0 }}>
              {formData?.title}
            </Title>
          </Col>
          <Col>
            <Tag color="green">{formData?.type}</Tag>
          </Col>
          <Col style={{ marginLeft: 'auto', fontSize: '22px' }}>
            <QrcodeOutlined
              onClick={() => {
                setQrValue(id)
                setQRModalVisible(true)
              }}
            />
          </Col>
        </Row>
        <Paragraph>
          {formData?.description.filter((lang) => lang.key === language)[0]?.text}
        </Paragraph>
        <Paragraph>{t('questions')}: </Paragraph>
        <ul>
          {formData?.questions.map((question) => (
            <li key={question.id}>
              <Text>{question.texts.filter((lang) => lang.key === language)[0]?.text}</Text>
            </li>
          ))}
        </ul>
      </Card>
      <Divider />
      <Title level={3} style={{ textAlign: 'left', padding: '0 0 0 24px' }}>
        {t('reviews')}:
      </Title>
      <Col style={{ padding: '0 24px' }}>
        <FilterComponent
          hasName
          hasEmail
          hasDate
          hasAnswer={formData?.type === 'Answer'}
          hasRating={formData?.type === 'Rating' || formData?.type === 'Ratings'}
        />
        <Row style={{ gap: 16 }}>
          {formReviewData[0].map((review) => {
            return <ReviewCard key={review.id} {...review} />
          })}
        </Row>
      </Col>
    </>
  )
}
