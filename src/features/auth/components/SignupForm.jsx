import { Button, Form, Input, Typography, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'

const { Title, Paragraph } = Typography

export const SignupForm = () => {
  const inputStyle = { padding: '10px 8px' }

  function handleFinish(values) {
    console.log(values)
  }

  return (
    <Row justify="center">
      <Col xs={{ span: 22 }} md={{ span: 20 }}>
        <Title level={3}>Welcome to Boi</Title>
        <Paragraph>
          Already have an account? <Link to="/sign-in">Sign in</Link>
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
            label="Username"
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
            label="Email"
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
            label="Password"
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
