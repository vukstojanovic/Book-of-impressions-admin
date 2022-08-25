import { useEffect } from 'react'
import { Row, Col, Card, Typography, Rate, Spin } from 'antd'
// import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

import { useGetGoogleReviewsQuery } from '../api/getGoogleReviews'
import { SingleReview } from '../components/SingleReview'

export const GoogleReviews = () => {
  const { data, isLoading } = useGetGoogleReviewsQuery()
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: 'ChIJgUbEo8cfqokR5lP9_Wh_DaM',
  // })

  useEffect(() => {
    console.log(data)
  }, [isLoading])

  if (isLoading) {
    return <Spin />
  }

  return (
    <div>
      {data && (
        <>
          <Row justify="space-between">
            <Card>
              <Typography.Title level={2}>{data?.name}</Typography.Title>
              <Rate allowHalf disabled defaultValue={data?.rating} />
            </Card>
            {/* {isLoaded && (
              <GoogleMap
                zoom={10}
                center={{ lat: 44, lng: -80 }}
                style={{ width: '300px', height: '300px' }}
              >
                <Marker position={{ lat: 44, lng: -80 }} />
              </GoogleMap>
            )} */}
            <iframe
              width={500}
              height={300}
              src="https://maps.google.com/maps?q=Hotel%20Moskva&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder={0}
            ></iframe>
          </Row>
          <Row gutter={[10, 10]}>
            {data?.reviews?.map((review, index) => {
              return (
                <Col key={`googleReview-${index}`} xs={24} lg={12}>
                  <SingleReview {...review} />
                </Col>
              )
            })}
          </Row>
        </>
      )}
    </div>
  )
}
