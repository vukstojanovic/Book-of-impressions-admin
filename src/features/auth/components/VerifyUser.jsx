import { Spin, Row, Col, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { confirmUser } from '../api/confirmUser'

export const VerifyUser = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const t = useTranslation('Verify_user')

  async function handleVerify() {
    const token = searchParams.get('token')
    try {
      await confirmUser({ token })
      message.success(t('user_verified'))
      navigate('/')
    } catch (err) {
      setIsLoading(false)
      setError(err.message)
      if (err.response.status === 400) {
        message.error(t('bad_confirmation_token'))
      } else {
        message.error(t('error'))
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
              {t('please_wait_while_your_account_is_being_verified')}
            </Typography.Paragraph>
          </Col>{' '}
        </>
      )}
      {error && <Typography.Title level={3}>{t('error')}</Typography.Title>}
    </Row>
  )
}
