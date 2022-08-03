import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Typography, Row, Col, Button, Form, Input, Upload } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { usePatchUserDataMutation } from '@/features/profileSettings/api/submitUserSettingForm'
import { beforeUpload } from '@/utils/beforeImageUpload.js'
import { getBase64 } from '@/utils/getBase64.js'

export function ProfileSettings() {
  const [loading, setLoading] = useState(false)
  const [imageObject, setImageObject] = useState(null)

  const { t } = useTranslation('profileSettings')

  const { Title } = Typography
  const [form] = Form.useForm()

  const patchUserData = usePatchUserDataMutation()

  const handleChange = (info) => {
    console.log(info.file)
    // if (info.file.status === 'uploading') {
    //   setLoading(true)
    //   return
    // }

    // if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, () => {
      setLoading(false)
      setImageObject(info.file)
      // setImageUrl(url)
    })
    // }
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
    const modifiedValues = {
      name: values.name,
      password: values.password,
      email: values.email,
      profileImage: imageObject,
    }
    console.log(modifiedValues)
    patchUserData.mutate(modifiedValues)
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
      >
        <Row>
          <Col sm={24} md={18} lg={8}>
            <Form.Item
              label={`${t('name')}:`}
              name="name"
              rules={[{ required: true, message: `${t('please_add_name')}` }]}
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
              label={`${t('password')}:`}
              name="password"
              rules={[{ required: true, message: `${t('please_add_password')}` }]}
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
                { required: true, message: `${t('please_confirm_password')}` },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
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
          <Col sm={24} md={18} lg={8}>
            <Form.Item label="Email:" name="email" initialValue={'dummy-email@gmail.com'}>
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          {t('submit')}
        </Button>
      </Form>
    </>
  )
}
