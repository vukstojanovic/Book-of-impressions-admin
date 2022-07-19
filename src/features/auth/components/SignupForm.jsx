import { Button, Form, Input, Typography, Row, Col, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import { useTranslation } from 'react-i18next'

import { registerUser } from '@/api/auth'
import { AdminLayout } from '@/components/layout/AdminLayout'

const { Title, Paragraph } = Typography

export const SignupForm = () => {
  const [form] = Form.useForm()
  const inputStyle = { padding: '10px 8px' }

  const { t } = useTranslation('Signup')

  const handleFinish = async ({ firstName, lastName, email, password }) => {
    const userData = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      email,
      password,
      role: 'ADMIN',
    }

    console.log(import.meta.env.REACT_APP_API_URL, userData)

    await registerUser(userData)
    form.resetFields()
  }

  return (
    <AdminLayout>
      <Col span={24} style={{ padding: '0px 20px' }}>
        <Title level={3}>{t('welcome')}</Title>
        <Paragraph>
          {t('question')} <Link to="/sign-in">{t('sign_in')}</Link>
        </Paragraph>
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          layout="vertical"
          onFinish={handleFinish}
        >
          <Row gutter={[20]}>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label={t('first_name')}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: t('first_name_warning'),
                  },
                ]}
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label={t('last_name')}
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: t('last_name_warning'),
                  },
                ]}
              >
                <Input size="large" style={inputStyle} />
              </Form.Item>
            </Col>
          </Row>

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
            <Input size="large" style={inputStyle} />
          </Form.Item>

          <Form.Item
            label={t('password')}
            name="password"
            rules={[
              {
                required: true,
                message: t('password_warning'),
              },
            ]}
          >
            <Input.Password size="large" style={inputStyle} />
          </Form.Item>

          <Form.Item name="agree" valuePropName="checked" noStyle>
            <Checkbox style={{ marginBottom: '20px' }}>{t('agree')}</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button block size="large" type="primary" htmlType="submit">
              {t('sign_up')}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </AdminLayout>
  )
}
