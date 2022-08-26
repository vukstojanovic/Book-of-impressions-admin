import { Card, Row, Typography, Image, Rate } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/sr'
import { useTranslation } from 'react-i18next'

export const SingleReview = ({ author_name, profile_photo_url, text, rating, time }) => {
  const { i18n } = useTranslation()
  dayjs.locale(i18n.language)
  dayjs.extend(relativeTime)

  return (
    <Card style={{ height: '100%', borderRadius: '12px' }}>
      <Row align="middle" style={{ marginBottom: '15px' }}>
        <Image referrerPolicy="no-referrer" src={profile_photo_url} width={45} preview={false} />
        <Typography.Text strong style={{ fontSize: '15px', marginLeft: '10px' }}>
          {author_name}
        </Typography.Text>
      </Row>
      <Row align="middle" style={{ marginBottom: '10px' }}>
        <Rate defaultValue={rating} allowHalf disabled style={{ marginRight: '10px' }} />
        <Typography.Text>{dayjs(time * 1000).fromNow()}</Typography.Text>
      </Row>
      <Typography.Text>{text}</Typography.Text>
    </Card>
  )
}
