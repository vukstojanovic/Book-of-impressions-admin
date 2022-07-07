import { Button, Form, Input, Typography, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import { useTranslation } from 'react-i18next'

const { Title, Paragraph } = Typography

export const SignupForm = () => {
  const inputStyle = { padding: '10px 8px' }
  const { t } = useTranslation('Signup')

  function handleFinish(values) {
    console.log(values)
  }

  return (
    <Row justify="center">
      <Col xs={{ span: 22 }} md={{ span: 20 }}>
        <Title level={3}>{t('welcome')}</Title>
        <Paragraph>
          {t('question')} <Link to="/sign-in">{t('signIn')}</Link>
        </Paragraph>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            label={t('username')}
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input size="large" style={inputStyle} />
          </Form.Item>

          <Form.Item
            label={t('email')}
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your email!',
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
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password size="large" style={inputStyle} />
          </Form.Item>

          <Form.Item>
            <Button block size="large" type="primary" htmlType="submit">
              {t('signUp')}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
