import { Form, Input, Row, Col, Radio, Space, Typography, Button, Card } from 'antd'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { useInviteUser } from '../api/inviteUser'

import { SpinnerWithBackdrop } from '@/components/spinners'
import { useAuth } from '@/providers/authProvider'
import { roleNames } from '@/config/constants'

export const InviteUser = () => {
  const { t } = useTranslation('InviteUser')
  const [form] = Form.useForm()

  const {
    user: { role },
  } = useAuth()

  const userRoles = [roleNames.MANAGER, roleNames.VIEWER]

  const [disabled, setDisabled] = useState(true)
  const inviteUserMutation = useInviteUser({ form, t, setDisabled })

  const handleFormChange = () => {
    const hasValues = form.getFieldsValue()
    const hasErrors = form.getFieldsError()
    if (!hasValues.name || !hasValues.email || !hasValues.role || hasErrors[1].errors.length) {
      return setDisabled(true)
    }
    return setDisabled(false)
  }

  const handleFinish = (data) => {
    inviteUserMutation.mutate({
      data,
    })
  }

  return (
    <>
      {inviteUserMutation.isLoading ? <SpinnerWithBackdrop /> : null}
      <Form
        style={{ backgroundColor: 'white', padding: '24px' }}
        layout="vertical"
        size="large"
        autoComplete="off"
        onFinish={handleFinish}
        onFieldsChange={handleFormChange}
        form={form}
      >
        <Row span={24} gutter={[45]}>
          <Col xs={{ span: 24 }} lg={{ span: 14 }}>
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
          <Col xs={{ span: 24 }} lg={{ span: 14 }}>
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
          <Col xs={{ span: 24 }} lg={{ span: 14 }}>
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
                          {t(role.toLowerCase())}
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
        {role !== 'Manager' ? null : (
          <Row justify="end" span={24} gutter={[10, 10]}>
            <Col>
              <Button
                disabled={disabled}
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
              >
                {t('invite')}
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </>
  )
}
