import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Typography, Row, Col, Button, Form, Input, Upload } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  usePatchUserDataMutation,
  useGetUserDataQuery,
} from '@/features/profileSettings/api/submitUserSettingForm'
import { beforeUpload } from '@/utils/beforeImageUpload.js'
import { getBase64 } from '@/utils/getBase64.js'

export function ProfileSettings() {
  const [loading, setLoading] = useState(false)
  const [imageObject, setImageObject] = useState(null)
  const [hasErrors, setHasErrors] = useState(null)
  const [areFieldsEmpty, setAreFieldsEmpty] = useState(false)

  const { t } = useTranslation('profileSettings')

  const { Title } = Typography
  const [form] = Form.useForm()

  const patchUserData = usePatchUserDataMutation()
  const { data, isFetching } = useGetUserDataQuery()

  useEffect(() => {
    console.log(data)
  }, [isFetching])

  useEffect(() => {
    setAreFieldsEmpty(
      !form.getFieldValue('password') && !form.getFieldValue('name') && !imageObject
    )
  }, [])

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, () => {
      setLoading(false)
      if (info.fileList.length > 0) {
        setImageObject(info.fileList[0])
      } else {
        setImageObject(null)
      }
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
    const modifiedValues = {}
    const keysWithValues = Object.keys(values).filter(
      (key) => values[key] && key !== 'email' && key !== 'confirm_password'
    )
    keysWithValues.forEach((key) => (modifiedValues[key] = values[key]))
    if (imageObject) modifiedValues.photo = imageObject
    console.log(modifiedValues)
    patchUserData.mutate(modifiedValues)
  }

  const handleFieldsChange = () => {
    const someErrors = form.getFieldsError().some(({ errors }) => errors.length)
    setHasErrors(someErrors)
    setAreFieldsEmpty(!form.getFieldValue('password') && !form.getFieldValue('name'))
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
      >
        <Row>
          <Col sm={24} md={18} lg={8}>
            <Form.Item label="Email:" name="email" initialValue={'dummy-email@gmail.com'}>
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
            <Form.Item label={`${t('profilePhoto')}:`} valuePropName="fileList">
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
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors || (areFieldsEmpty && !imageObject)}
              >
                {t('submit')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}
