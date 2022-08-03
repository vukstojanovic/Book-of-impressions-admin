import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Row, Col, Form, Input, Upload, message, Tabs, Button } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { beforeUpload } from '@/utils/beforeImageUpload'

export function Settings() {
  const { t } = useTranslation('settings')

  const { TextArea } = Input
  const { TabPane } = Tabs
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState()

  const onFinish = ({
    'company-name': name,
    'company-email': email,
    'en-desc': enDescription,
    'sr-desc': srDescription,
  }) => {
    // Added this check for logo 'cause for some reason rules and required doesn't work with upload componenet
    if (!image) {
      message.error(t('error_logo'))
      return
    }

    // Data for sending on /api/wapp/company/{id}
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
      logo: image,
    }

    console.log(companyInfo)
  }

  const handleChange = (info) => {
    setImage(info.file)
  }

  const onReset = () => {
    form.resetFields()
    setLoading(false)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
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
      form={form}
      onFinish={onFinish}
      style={{ backgroundColor: 'white', padding: '10px 30px' }}
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
            rules={[{ required: true, message: t('error_email') }]}
          >
            <Input placeholder={t('company_email')} />
          </Form.Item>
        </Col>
      </Row>
      <p style={{ marginBottom: '-10px', marginTop: '10px' }}>{t('company_description')}</p>
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
                  style={{ width: '60%', marginTop: '6px' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      <Form.Item
        label={t('company_logo')}
        valuePropName="fileList"
        rules={[{ required: true, message: 'Please add logo for the company!' }]}
      >
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
        <Button style={{ marginRight: '10px' }} onClick={onReset}>
          {t('cancel')}
        </Button>
        <Button type="primary" htmlType="submit">
          {t('submit')}
        </Button>
      </Form.Item>
    </Form>
  )
}
