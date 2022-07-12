import { Form, Input, Row, Col, Radio, Space, Typography, Button } from 'antd'

export const InviteUser = () => {
  const roles = ['admin', 'editor', 'viewer']
  const [form] = Form.useForm()

  function handleFinish(values) {
    console.log(values)
  }

  return (
    <Col sm={{ span: 24 }} md={{ span: 17 }} lg={{ span: 12 }}>
      <Form layout="vertical" autoComplete="off" onFinish={handleFinish} form={form}>
        <Row span={24} gutter={[45]}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              label="First name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Cannot be empty!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: 'Cannot be empty!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Cannot be empty!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Roles:"
          name="roles"
          rules={[
            {
              required: true,
              message: 'Cannot be empty!',
            },
          ]}
        >
          <Radio.Group>
            <Space direction="vertical">
              {roles.map((role) => (
                <Radio value={role} key={role}>
                  <Typography.Paragraph style={{ textTransform: 'capitalize' }}>
                    {role}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={{ color: 'gray', fontSize: '14px' }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, quo iste. Beatae
                    nemo libero aliquid dolore eveniet asperiores pariatur exercitationem quasi?
                    Possimus, at? Cum consequuntur dolorum soluta nulla, natus velit. Aliquam amet,
                    dolorum tenetur.
                  </Typography.Paragraph>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
        <Space>
          <Button style={{ width: '110px' }} onClick={form.resetFields}>
            Cancel
          </Button>
          <Button htmlType="submit" style={{ width: '110px' }}>
            Invite
          </Button>
        </Space>
      </Form>
    </Col>
  )
}
