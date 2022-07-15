import { Row, Card, Form, Input, Checkbox, Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { AdminLayout } from '@/components/layout/AdminLayout'

const { Title, Paragraph } = Typography

export const LoginForm = () => {
  const { t } = useTranslation('Login')
  const onFinish = ({ email, password, remember }) => {
    console.log(email, password, 'Remember: ' + remember)
  }

  return (
    <AdminLayout>
      <Card style={{ padding: '50px' }}>
        <Title level={2}>{t('login_welcome')}</Title>
        <Paragraph>
          {t('welcome_create')} <Link to="/sign-up">{t('create_account')}</Link>
        </Paragraph>
        <Form
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
            rules={[{ required: true, message: t('password_warning') }]}
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
      </Card>
    </AdminLayout>
  )
}
