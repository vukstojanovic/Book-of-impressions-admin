import { Card, Rate, Row, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Reviews = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation('Reviews')
  const { Text, Paragraph, Title } = Typography
  const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt temporibus eligendi
          esse, voluptate architecto reprehenderit eos. Ipsa voluptatum, unde dolores iusto odit
          debitis, nulla non dignissimos expedita, rem tempora optio? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Corrupti error, officiis necessitatibus dolor esse, eveniet
          odio debitis laboriosam distinctio facere mollitia aliquid, accusamus ipsa illo quo ab
          obcaecati quis repellat. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Delectus dicta deserunt officia hic sit dignissimos iste ipsam consequuntur commodi odit,
          distinctio expedita similique minima, mollitia asperiores architecto aperiam quidem est.`

  const reviews = [
    { user: { name: 'Firstname Surname' }, postedAt: '21-06-2021', description: text, rating: 1 },
    { user: { name: 'Firstname Surname' }, postedAt: '21-06-2021', description: text, rating: 4 },
    { user: { name: 'Firstname Surname' }, postedAt: '21-06-2021', description: text, rating: 2 },
    { user: { name: 'Firstname Surname' }, postedAt: '21-06-2021', description: text, rating: 5 },
    { user: { name: 'Firstname Surname' }, postedAt: '21-06-2021', description: text, rating: 2.5 },
    { user: { name: 'Firstname Surname' }, postedAt: '21-06-2021', description: text, rating: 4.5 },
  ]
  return (
    <>
      <Text>
        {t('home')} / {t('reviews')}
      </Text>
      <Title>{t('reviews')}</Title>
      <Row style={{ gap: 16 }}>
        {reviews.map((review, i) => (
          <Card
            key={i}
            hoverable
            bordered
            loading={isLoading}
            type="inner"
            style={{ borderRadius: '8px' }}
            onClick={() => setIsLoading(false)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>
                {t('name')}: {review.user.name}
              </Text>
              <Text>{review.postedAt}</Text>
              <Rate disabled allowHalf defaultValue={review.rating} />
            </div>

            <Paragraph
              ellipsis={{
                expandable: true,
                rows: 3,
                symbol: t('readMore') + '...',
              }}
              title="review description"
            >
              {review.description}
            </Paragraph>
          </Card>
        ))}
      </Row>
    </>
  )
}
