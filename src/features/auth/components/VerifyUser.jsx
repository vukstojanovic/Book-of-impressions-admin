import { Spin, Row, Col, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { confirmUser } from '../api/confirmUser'

export const VerifyUser = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  async function handleVerify() {
    const token = searchParams.get('token')
    try {
      await confirmUser({ token })
      message.success('User verified')
      navigate('/')
    } catch (err) {
      setIsLoading(false)
      setError(err.message)
      if (err.response.status === 400) {
        message.error('Bad request')
      } else {
        message.error('Error')
      }
    }
  }

  useEffect(() => {
    handleVerify()
  }, [])

  return (
    <Row justify="center" align="middle" style={{ marginTop: '70px', textAlign: 'center' }}>
      {isLoading && (
        <>
          {' '}
          <Col span={24} style={{ marginBottom: '20px' }}>
            <Spin size="large" />
          </Col>
          <Col span={24}>
            <Typography.Paragraph style={{ fontSize: '17px' }}>
              Please wait while your account is being verified.
            </Typography.Paragraph>
          </Col>{' '}
        </>
      )}
      {error && <Typography.Title level={3}>Error, {error}</Typography.Title>}
    </Row>
  )
}
