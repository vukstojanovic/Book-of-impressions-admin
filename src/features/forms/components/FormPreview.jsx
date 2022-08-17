import { Spin, Typography, Card, Tag, Row, Col, List } from 'antd'
import { useParams } from 'react-router-dom'

import { useGetForm } from '../api/getForm'
import { useGetFormReviews } from '../api/getFormReviews'

import { ReviewCard } from '@/components/reviewCard'

export const FormPreview = () => {
  const { id } = useParams()
  const { data: formData, isLoading: formIsLoading } = useGetForm({ id })
  const { data: formReviewData, isLoading: reviewIsLoading } = useGetFormReviews({ id })
  const { Paragraph, Text } = Typography
  console.log(formData)
  console.log(formReviewData)
  if (formIsLoading || reviewIsLoading) return <Spin />
  return (
    <>
      <Card style={{ borderRadius: '8px' }}>
        <Row gutter={16} align="middle">
          <Col>
            <Text>{formData.title}</Text>
          </Col>
          <Col>
            <Tag color="green">{formData.type}</Tag>
          </Col>
        </Row>
        <Paragraph>{formData.description[0].text}</Paragraph>
        <List
          header={<div>Questions:</div>}
          dataSource={formData.questions}
          bullets
          renderItem={(item) => <Text>{item.texts[0]?.text}</Text>}
        ></List>
      </Card>
      <Row style={{ gap: 16, paddingTop: '16px' }}>
        {formReviewData.map((review) => {
          return <ReviewCard key={review.id} review={review} />
        })}
      </Row>
    </>
  )
}
