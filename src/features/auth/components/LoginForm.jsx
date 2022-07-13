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
            label="E-mail"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please enter your E-mail!',
              },
            ]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your Password!' }]}
          >
            <Input.Password type="password" placeholder="Password" size="large" />
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
