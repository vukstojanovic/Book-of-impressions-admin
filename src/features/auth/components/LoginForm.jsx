import { Row, Col, Form, Input, Button, Typography, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

// import { loginUser } from '@/features/auth/api/login'
import { AdminLayout } from '@/components/layout/AdminLayout'
// import storage from '@/utils/storage'
import { useAuth } from '@/providers/authProvider'

const { Title, Paragraph } = Typography

export const LoginForm = () => {
  const [form] = Form.useForm()

  // const navigate = useNavigate()

  const { t } = useTranslation('Login')

  const { login, refetchUser, isLoggingIn } = useAuth()

  const onFinish = async ({ email, password }) => {
    try {
      const userData = {
        email,
        password,
      }

      await login(userData)
      await refetchUser()

      // if (access_token && refrresh_token) {
      //   storage.set('access_token', access_token)
      //   storage.set('refresh_token', refrresh_token)

      //   navigate('/')
      // }
    } catch (error) {
      if (error.response.status === 400) {
        return message.error(t('error'), 3)
      }
      if (error.response.status === 401) {
        return message.error(t('error'), 3)
      }
      if (error) {
        return message.error(t('errorServer'), 3)
      }
    }
  }

  return (
    <AdminLayout>
      <Col style={{ padding: '0px 20px', width: '380px' }}>
        <Title level={2}>{t('login_welcome')}</Title>
        <Paragraph>
          {t('welcome_create')} <Link to="/sign-up">{t('create_account')}</Link>
        </Paragraph>
        <Form
          form={form}
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label={t('email')}
            name="email"
            rules={[
              {
                type: 'email',
                message: t('valid_email_warning'),
              },
              {
                required: true,
                message: t('email_warning'),
              },
            ]}
          >
            <Input placeholder={t('email')} size="large" />
          </Form.Item>
          <Form.Item
            label={t('password')}
            name="password"
            rules={[{ required: true, message: t('password_warning'), min: 8 }]}
          >
            <Input.Password type="password" placeholder={t('password')} size="large" />
          </Form.Item>
          <Form.Item>
            <Row justify="end">
              <Link to="">{t('forgot_password')}</Link>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={isLoggingIn}>
              {t('log_in')}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </AdminLayout>
  )
}
