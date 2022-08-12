import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Typography, Row, Col, Button, Form, Input, Upload, message } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'

import { usePatchUserDataMutation } from '@/features/profileSettings/api/submitUserSettingForm'
import { beforeUpload } from '@/utils/beforeImageUpload.js'
import { getBase64 } from '@/utils/getBase64.js'

export function ProfileSettings() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(null)
  const [areFieldsEmpty, setAreFieldsEmpty] = useState(true)

  const { t } = useTranslation('ProfileSettings')

  const { Title } = Typography
  const [form] = Form.useForm()

  const patchUserData = usePatchUserDataMutation()
  const queryClient = useQueryClient()
  const res = queryClient.getQueryData('userSettingForm')
  console.log(res)

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, () => {
      setLoading(false)
    })
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  const handleFinish = (values) => {
    // separate keys with values from those without them
    console.log(values)
    const formData = new FormData()
    const modifiedValues = {}
    const keysWithValues = Object.keys(values).filter(
      // (key) => values[key]?.length && key !== 'email' && key !== 'confirm_password'
      (key) =>
        values[key] && values[key] !== res[key] && key !== 'email' && key !== 'confirm_password'
    )

    if (keysWithValues.length) {
      keysWithValues.forEach((key) => {
        if (key === 'profilePhoto') {
          formData.append(key, values[key][0]?.originFileObj)
          modifiedValues[key] = values[key][0]?.originFileObj
        } else {
          formData.append(key, values[key])
          modifiedValues[key] = values[key]
        }
      })
    }

    console.log(modifiedValues)

    patchUserData.mutate(formData, {
      onSuccess: () => {
        message.success('Changes successfully sent.')
        form.resetFields()
        setAreFieldsEmpty(true)
      },
      onError: () => message.error('Error while sending data.'),
    })
  }

  const handleFieldsChange = () => {
    const someErrors = form.getFieldsError().some(({ errors }) => errors?.length)
    setHasErrors(someErrors)
    setAreFieldsEmpty(
      !form.getFieldValue('password').trim() &&
        !form.getFieldValue('name').trim() &&
        !form.getFieldValue('profilePhoto')?.length
    )
  }

  const handleValuesChange = () => {
    form.validateFields()
  }

  return (
    <>
      <Title>{t('my_profile')}</Title>
      <Form
        form={form}
        size="large"
        style={{ backgroundColor: 'white', padding: '24px' }}
        layout="vertical"
        onFinish={handleFinish}
        onFieldsChange={handleFieldsChange}
        onValuesChange={handleValuesChange}
        initialValues={{
          name: res?.name,
          password: '',
          confirm_password: '',
          photo: [
            {
              uid: '-3',
              name: 'image.jpg',
              status: 'done',
              url: res?.profilePhoto,
            },
          ],
          email: res?.email,
        }}
      >
        <Row>
          <Col sm={24} md={18} lg={8}>
            <Form.Item label="Email:" name="email">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={18} lg={8}>
            <Form.Item
              label={`${t('name')}:`}
              name="name"
              rules={[{ message: `${t('please_add_name')}` }]}
            >
              <Input placeholder={t('name')} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col sm={24} md={18} lg={14}>
            <Form.Item
              label={`${t('profilePhoto')}:`}
              valuePropName="fileList"
              name="profilePhoto"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e
                }
                return e && e.fileList
              }}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={(true, { showPreviewIcon: false })}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                maxCount={1}
                action="UploadUrl"
                defaultFileList={[
                  {
                    uid: '-1',
                    name: 'image.jpg',
                    status: 'done',
                    url: res?.profilePhoto,
                  },
                ]}
              >
                {uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={18} lg={8}>
            <Form.Item
              shouldUpdate
              label={`${t('password')}:`}
              name="password"
              rules={[{ message: `${t('please_add_password')}` }]}
            >
              <Input.Password placeholder={t('password')} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={18} lg={8}>
            <Form.Item
              label={`${t('confirm_password')}:`}
              name="confirm_password"
              dependencies={['password']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue('password') === value || !getFieldValue('password')) {
                      return Promise.resolve()
                    }
                    return Promise.reject(t('passwords_do_not_match'))
                  },
                }),
              ]}
            >
              <Input.Password placeholder={t('confirm_password')} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col sm={24} md={18} lg={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={hasErrors || areFieldsEmpty}>
                {t('submit')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}
