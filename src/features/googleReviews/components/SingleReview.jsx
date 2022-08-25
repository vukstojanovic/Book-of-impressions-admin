import { Card, Row, Image, Typography, Rate } from 'antd'

export const SingleReview = ({
  author_name,
  profile_photo_url,
  text,
  relative_time_description,
  rating,
}) => {
  return (
    <Card style={{ height: '100%', borderRadius: '12px' }}>
      <Row align="middle" style={{ marginBottom: '15px' }}>
        <Image src={profile_photo_url} width={45} preview={false} />
        <Typography.Text strong style={{ fontSize: '15px', marginLeft: '10px' }}>
          {author_name}
        </Typography.Text>
      </Row>
      <Row align="middle" style={{ marginBottom: '10px' }}>
        <Rate defaultValue={rating} allowHalf disabled style={{ marginRight: '10px' }} />
        <Typography.Text>{relative_time_description}</Typography.Text>
      </Row>
      <Typography.Text>{text}</Typography.Text>
    </Card>
  )
}
