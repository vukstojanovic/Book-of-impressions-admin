import { Form, Input, Row, Col, Radio, Space, Typography, Button, Card } from 'antd'
import { useTranslation } from 'react-i18next'

import { roleNames } from '@/config/constants'

export const InviteUser = () => {
  const userRoles = [roleNames.ADMIN, roleNames.EDITOR, roleNames.VIEWER]
  const [form] = Form.useForm()
  const { t } = useTranslation('InviteUser')

  function handleFinish(values) {
    console.log(values)
  }

  return (
    <Col sm={{ span: 24 }} md={{ span: 17 }} lg={{ span: 12 }}>
      <Typography.Title level={3} style={{ margin: '30px 0px' }}>
        {t('title')}
      </Typography.Title>
      <Form layout="vertical" autoComplete="off" onFinish={handleFinish} form={form}>
        <Row span={24} gutter={[45]}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              label={t('first_name')}
              name="firstName"
              rules={[
                {
                  required: true,
                  message: t('empty_warning'),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              label={t('last_name')}
              name="lastName"
              rules={[
                {
                  required: true,
                  message: t('empty_warning'),
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label={t('email')}
          name="email"
          rules={[
            {
              required: true,
              message: t('empty_warning'),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t('roles')}
          name="role"
          rules={[
            {
              required: true,
              message: t('empty_warning'),
            },
          ]}
        >
          <Card>
            <Radio.Group>
              <Space direction="vertical">
                {userRoles.map((role) => (
                  <Radio value={role} key={role}>
                    <Typography.Paragraph style={{ textTransform: 'capitalize' }}>
                      {t(role)}
                    </Typography.Paragraph>
                    <Typography.Paragraph style={{ color: 'gray', fontSize: '14px' }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, quo iste.
                      Beatae nemo libero aliquid dolore eveniet asperiores pariatur exercitationem
                      quasi? Possimus, at? Cum consequuntur dolorum soluta nulla, natus velit.
                      Aliquam amet, dolorum tenetur.
                    </Typography.Paragraph>
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Card>
        </Form.Item>
        <Row span={24} gutter={[10, 10]}>
          <Col xs={{ span: 24 }} md={{ span: 7 }}>
            <Button style={{ width: '100%' }} type="primary" onClick={() => form.resetFields()}>
              {t('cancel')}
            </Button>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 7 }}>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              {t('invite')}
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  )
}
