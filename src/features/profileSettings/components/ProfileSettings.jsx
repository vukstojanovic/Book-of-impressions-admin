import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Row, Col, Button, Form, Input, Upload, message, Spin } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  usePatchUserDataMutation,
  useGetUserDataQuery,
} from '@/features/profileSettings/api/submitUserSettingForm'
import { beforeUpload } from '@/utils/beforeImageUpload.js'
import { getBase64 } from '@/utils/getBase64.js'

export function ProfileSettings() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(null)
  const [areFieldsEmpty, setAreFieldsEmpty] = useState(true)
  const [changedFields, setChangedFields] = useState({})

  const { t } = useTranslation('ProfileSettings')

  const [form] = Form.useForm()

  const patchUserData = usePatchUserDataMutation()
  const { data, isLoading, isError, error } = useGetUserDataQuery()

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

  const handleFinish = () => {
    const formData = new FormData()
    const changedFieldsKeys = Object.keys(changedFields)
    changedFieldsKeys.forEach((key) => formData.append(key, changedFields[key]))

    patchUserData.mutate(formData, {
      onSuccess: () => {
        message.success(t('changes_successfully_sent'))
        setAreFieldsEmpty(true)
        form.resetFields(['password', 'confirm_password'])
        setChangedFields({})
      },
      onError: () => message.error(t('error_while_sending_data')),
    })
  }

  const handleFieldsChange = () => {
    const someErrors = form.getFieldsError().some(({ errors }) => errors?.length)
    setHasErrors(someErrors)
    setAreFieldsEmpty(!Object.keys(changedFields).length)
  }

  const handleValuesChange = (changedProp) => {
    form.validateFields()
    if (Object.hasOwn(changedProp, 'confirm_password')) return
    if (Object.values(changedProp)[0] === '') {
      setChangedFields((prev) => {
        const changedPropKey = Object.keys(changedProp)[0]
        const objCopy = prev
        delete objCopy[changedPropKey]
        return objCopy
      })
    } else if (Object.hasOwn(changedProp, 'profilePhoto')) {
      setChangedFields((prev) => ({
        ...prev,
        profilePhoto: changedProp.profilePhoto[0]?.originFileObj,
      }))
    } else {
      setChangedFields((prev) => ({ ...prev, ...changedProp }))
    }
  }

  return (
    <>
      {isError && <div style={{ marginTop: '15px' }}>{error.message}</div>}
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Form
          form={form}
          size="large"
          style={{ backgroundColor: 'white', padding: '24px' }}
          layout="vertical"
          onFinish={handleFinish}
          onFieldsChange={handleFieldsChange}
          onValuesChange={handleValuesChange}
          initialValues={{
            name: data?.name,
            password: '',
            confirm_password: '',
            profilePhoto:
              data?.profilePhoto === 'undefined' || !data?.profilePhoto
                ? []
                : [
                    {
                      uid: '-1',
                      name: 'image',
                      status: 'done',
                      url: data?.profilePhoto,
                    },
                  ],
            email: data?.email,
          }}
        >
          <Row>
            <Col sm={24} md={18} lg={8}>
              <Form.Item
                label="Email:"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: t('valid_email_warning'),
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={18} lg={8}>
              <Form.Item
                label={`${t('name')}:`}
                name="name"
                rules={[
                  { required: true, message: `${t('please_add_name')}` },
                  {
                    validator: (_, value) =>
                      value.trim() === value
                        ? Promise.resolve()
                        : Promise.reject(new Error(t('no_spaces_at_beggining_or_end'))),
                  },
                  {
                    pattern: new RegExp(/^[a-zA-Z\s]*$/),
                    message: t('no_special_characters'),
                  },
                ]}
              >
                <Input placeholder={t('name')} maxLength={70} />
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
                rules={[
                  { min: 8, message: `${t('password_min_8')}` },
                  {
                    validator: (_, value) =>
                      value.trim() === value
                        ? Promise.resolve()
                        : Promise.reject(new Error(t('no_spaces_at_beggining_or_end'))),
                  },
                ]}
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
                      if (getFieldValue('password') === value) {
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
      )}
    </>
  )
}
