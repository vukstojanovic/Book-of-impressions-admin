import { Form, Input, Row, Col, Radio, Space, Typography, Button, Card } from 'antd'
import { useTranslation } from 'react-i18next'

import { useInviteUser } from '../api/inviteUser'

import { roleNames } from '@/config/constants'

export const InviteUser = () => {
  const userRoles = [roleNames.MANAGER, roleNames.VIEWER]
  const [form] = Form.useForm()
  const { t } = useTranslation('InviteUser')

  const inviteUserMutation = useInviteUser()

  function handleFinish(values) {
    console.log(values)
    // Endpoint does not work yet
    inviteUserMutation.mutate({
      data: values,
    })
    inviteUserMutation.isSuccess && console.log('asd')
  }

  return (
    <Col sm={{ span: 24 }}>
      <Form
        style={{ backgroundColor: 'white', padding: '24px' }}
        layout="vertical"
        size="large"
        autoComplete="off"
        onFinish={handleFinish}
        form={form}
      >
        <Row span={24} gutter={[45]}>
          <Col xs={{ span: 14 }}>
            <Form.Item
              label={t('name')}
              name="name"
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
        <Row span={24} gutter={[45]}>
          <Col xs={{ span: 14 }}>
            <Form.Item
              label={t('email')}
              name="email"
              rules={[{ type: 'email', required: true, message: t('error_email') }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row span={24} gutter={[45]}>
          <Col xs={{ span: 14 }}>
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
                          {t('description')}
                        </Typography.Paragraph>
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Card>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end" span={24} gutter={[10, 10]}>
          <Col>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              {t('invite')}
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  )
}
