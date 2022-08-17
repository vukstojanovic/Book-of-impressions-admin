import { Spin, Typography, Card, Tag, Row, Col, Divider } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useGetForm } from '../api/getForm'
import { useGetFormReviews } from '../api/getFormReviews'

import { ReviewCard } from '@/components/reviewCard'

export const FormPreview = () => {
  const {
    i18n: { language },
  } = useTranslation()

  const [param] = useSearchParams()

  const id = param.get('id')
  const { data: formData, isLoading: formIsLoading } = useGetForm({ id })

  const { data: formReviewData, isLoading: reviewIsLoading } = useGetFormReviews({ id })
  const { Paragraph, Text, Title } = Typography
  if (formIsLoading || reviewIsLoading) return <Spin />

  return (
    <>
      <Card style={{ borderRadius: '8px' }}>
        <Row gutter={16} align="middle">
          <Col>
            <Title level={3} strong>
              {formData.title}
            </Title>
          </Col>
          <Col style={{ margin: '0 0 12px 0' }}>
            <Tag color="green">{formData.type}</Tag>
          </Col>
        </Row>
        <Paragraph>
          {formData.description.filter((lang) => lang.key === language)[0]?.text}
        </Paragraph>
        <Text></Text>
        <Paragraph>Questions: </Paragraph>
        <ul>
          {formData.questions.map((question) => (
            <li key={question.id}>
              <Text>{question.texts.filter((lang) => lang.key === language)[0]?.text}</Text>
            </li>
          ))}
        </ul>
      </Card>
      <Divider />
      <Title level={3} style={{ textAlign: 'center' }}>
        Reviews:
      </Title>
      <Col style={{ padding: '0 24px' }}>
        <Row style={{ gap: 16 }}>
          {formReviewData.map((review) => {
            return <ReviewCard key={review.id} review={review} />
          })}
        </Row>
      </Col>
    </>
  )
}
