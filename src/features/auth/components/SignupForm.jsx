import { useState } from 'react'
import { Button, Form, Input, Typography, Row, Col, message, Modal } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import 'antd/dist/antd.css'
import { useTranslation } from 'react-i18next'

import style from './SignupForm.module.css'

import { registerUser } from '@/features/auth/api/register'
import { AdminLayout } from '@/components/layout/AdminLayout'

const { Title, Paragraph, Text } = Typography

export const SignupForm = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [isModalOpened, setModalOpened] = useState(false)
  const [registerIsLoading, setRegisterIsLoading] = useState(false)

  const { t } = useTranslation('Signup')

  const handleSubmit = async ({ firstName, lastName, email, password, companyName }) => {
    setRegisterIsLoading(true)
    try {
      const userData = {
        name: `${firstName.trim()} ${lastName.trim()}`,
        email,
        password,
        companyName,
      }
      const { response } = await registerUser(userData)

      if (response === 'OK') {
        message.success(t('successfully_registered'))
        navigate('/sign-in')
      }
    } catch (error) {
      if (error.response.status !== 400) {
        return message.error(t('errorServer'), 3)
      }
      if (error) {
        message.error(t('error'), 3)
      }
    }
    setRegisterIsLoading(false)
  }

  return (
    <AdminLayout>
      <Col style={{ padding: '0px 20px', width: '380px' }}>
        <Title level={2}>{t('welcome')}</Title>
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
          onFinish={handleSubmit}
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
                  {
                    pattern: new RegExp(/^[a-zšđžčć-\s]*$/gi),
                    message: t('no_special_characters'),
                  },
                  {
                    min: 2,
                    message: t('longer_than_2_characters'),
                  },
                ]}
              >
                <Input size="large" maxLength={70} />
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
                  {
                    pattern: new RegExp(/^[a-zšđžčć-\s]*$/gi),
                    message: t('no_special_characters'),
                  },
                  {
                    min: 2,
                    message: t('longer_than_2_characters'),
                  },
                ]}
              >
                <Input size="large" maxLength={70} />
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
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label={t('password')}
            name="password"
            rules={[
              {
                required: true,
                message: t('password_warning'),
                min: 8,
              },
              {
                validator: (_, value) =>
                  value.trim() === value
                    ? Promise.resolve()
                    : Promise.reject(new Error(t('no_spaces_at_beggining_or_end'))),
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            label={t('company_name')}
            name="companyName"
            rules={[
              {
                required: true,
                message: t('company_name_warning'),
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button block size="large" type="primary" loading={registerIsLoading} htmlType="submit">
              {t('sign_up')}
            </Button>
          </Form.Item>
          <Paragraph>
            {t('agree')}{' '}
            <Text
              type="danger"
              underline
              className={style.termsLink}
              onClick={() => {
                setModalOpened(true)
              }}
            >
              {t('agree_link')}
            </Text>
          </Paragraph>
        </Form>
        <Modal
          title={t('terms_modal_title')}
          visible={isModalOpened}
          onOk={() => {
            setModalOpened(false)
          }}
          onCancel={() => {
            setModalOpened(false)
          }}
          cancelButtonProps={{
            style: {
              display: 'none',
            },
          }}
        >
          <p>{t('terms_content')}</p>
        </Modal>
      </Col>
    </AdminLayout>
  )
}
