import { Row, Col, Form, Input, Checkbox, Button, Typography, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { loginUser } from '@/features/auth/api/login'
import { AdminLayout } from '@/components/layout/AdminLayout'
import storage from '@/utils/storage'

const { Title, Paragraph } = Typography

export const LoginForm = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { t } = useTranslation('Login')

  const onFinish = async ({ email, password }) => {
    try {
      const userData = {
        email,
        password,
      }
      const { access_token, refrresh_token } = await loginUser(userData)

      if (access_token && refrresh_token) {
        storage.set('access_token', access_token)
        storage.set('refresh_token', refrresh_token)

        navigate('/')
      }
    } catch (error) {
      if (error.response.status === 400) {
        message.error(`${error.response.data.message}. Please login with correct email.`, 3)
      }
      if (error.response.status === 401) {
        message.error(`${error.response.data.message}. Please login with correct password.`, 3)
      }
    } finally {
      form.resetFields()
    }
  }

  return (
    <AdminLayout>
      <Col style={{ width: '380px' }}>
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
          wrapperCol={{ span: 24 }}
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
            <Row justify="space-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('remember_me')}</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                {t('forgot_password')}
              </a>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block={true}
              size="large"
            >
              {t('log_in')}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </AdminLayout>
  )
}
