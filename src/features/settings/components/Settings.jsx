import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Row, Col, Form, Input, Upload, Tabs, Button, message } from 'antd'
import { useTranslation } from 'react-i18next'

import { beforeUpload } from '@/utils/beforeImageUpload'

export function Settings() {
  const [image, setImage] = useState(null)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  // console.log(setButtonDisabled)

  const { t } = useTranslation('settings')

  const { TextArea } = Input
  const { TabPane } = Tabs
  const [form] = Form.useForm()

  const onFinish = ({
    'company-name': name,
    'company-email': email,
    'en-desc': enDescription,
    'sr-desc': srDescription,
  }) => {
    if (!enDescription || !srDescription) {
      message.error(t('error_description', 3))
      return
    }

    const companyInfo = {
      name,
      email,
      description: [
        {
          key: 'en',
          text: enDescription,
        },
        {
          key: 'sr',
          text: srDescription,
        },
      ],
      logo: image ? image : null,
    }

    console.log(companyInfo)
    form.resetFields()
  }

  // const onFinishFailed = ({ errorFields }) => {
  //   const descriptionErrors = errorFields.filter((error) => {
  //     return error.name[0] === 'en-desc' || error.name[0] === 'sr-desc'
  //   })

  //   const nameError = errorFields.filter((error) => {
  //     return error.name[0] === 'company-name'
  //   })

  //   const emailError = errorFields.filter((error) => {
  //     return error.name[0] === 'company-email'
  //   })

  //   console.log(descriptionErrors, nameError, emailError)

  //   if (descriptionErrors.length > 0 && nameError.length === 0 && emailError.length === 0) {
  //     message.error(t('error_description'))
  //   }
  // }

  const onValuesChange = (
    changeValues,
    { 'company-email': email, 'company-name': name, 'en-desc': enDesc, 'sr-desc': srDesc }
  ) => {
    if (email && name && enDesc && srDesc) {
      setButtonDisabled(false)
      return
    }
    setButtonDisabled(true)
  }

  const onFieldsChange = (changedFields, allFields) => {
    console.log(changedFields, allFields)
  }

  const handleChange = (info) => {
    setImage(info.file)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        {t('upload')}
      </div>
    </div>
  )

  return (
    <Form
      size="large"
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={onFinish}
      style={{ backgroundColor: 'white', padding: '10px 30px' }}
      onFieldsChange={onFieldsChange}
      onValuesChange={onValuesChange}
    >
      <Row gutter={24}>
        <Col lg={8} md={12} xs={24}>
          <Form.Item
            label={t('company_name')}
            name="company-name"
            rules={[{ required: true, message: t('error_name') }]}
          >
            <Input placeholder={t('company_name')} />
          </Form.Item>
        </Col>
        <Col lg={8} md={12} xs={24}>
          <Form.Item
            label={t('company_email')}
            name="company-email"
            rules={[
              { required: true, message: t('error_email') },
              { type: 'email', message: t('error_valid_email') },
            ]}
          >
            <Input placeholder={t('company_email')} />
          </Form.Item>
        </Col>
      </Row>
      <p style={{ marginBottom: '-10px', marginTop: '15px' }}>{t('company_description')}</p>
      <Tabs
        defaultActiveKey="en"
        type="line"
        hideAdd
        tabBarGutter={40}
        tabBarStyle={{ margin: '0 0 10px 30px', width: 85 }}
      >
        <TabPane tab="EN" key="en">
          <Row>
            <Col lg={16} md={24} xs={24}>
              <Form.Item
                name="en-desc"
                rules={[{ required: true, message: t('error_description') }]}
              >
                <TextArea
                  placeholder={t('company_description')}
                  name="english-desc"
                  autoSize={{ minRows: 6, maxRows: 10 }}
                  style={{ marginTop: '6px' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="SR" key="sr">
          <Row>
            <Col lg={16} md={24} xs={24}>
              <Form.Item
                name="sr-desc"
                rules={[{ required: true, message: t('error_description') }]}
              >
                <TextArea
                  placeholder={t('company_description')}
                  name="serbian-dec"
                  autoSize={{ minRows: 6, maxRows: 10 }}
                  style={{ marginTop: '6px' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      <Form.Item label={t('company_logo')} valuePropName="fileList">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={(true, { showPreviewIcon: false })}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          maxCount={1}
        >
          {uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit" disabled={buttonDisabled ? true : false}>
          {t('submit')}
        </Button>
      </Form.Item>
    </Form>
  )
}
