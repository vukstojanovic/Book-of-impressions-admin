import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Row, Col, Form, Input, Upload, Tabs, Button } from 'antd'
import { useTranslation } from 'react-i18next'

import style from './Settings.module.css'

import { beforeUpload } from '@/utils/beforeImageUpload'

export function Settings() {
  const [descriptionErrorEn, setDescriptionErrorEn] = useState(false)
  const [descriptionErrorSr, setDescriptionErrorSr] = useState(false)
  const [image, setImage] = useState(null)
  const [buttonDisabled, setButtonDisabled] = useState(true)

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

  const onValuesChange = (
    changeValues,
    { 'company-email': email, 'company-name': name, 'en-desc': enDesc, 'sr-desc': srDesc }
  ) => {
    if (enDesc && !srDesc) {
      setDescriptionErrorEn(true)
    } else if (enDesc && srDesc) {
      setDescriptionErrorEn(false)
    }

    if (!srDesc && enDesc) {
      setDescriptionErrorSr(true)
    } else if (srDesc && enDesc) {
      setDescriptionErrorSr(false)
    }

    if (email && name && enDesc && srDesc) {
      setButtonDisabled(false)
      return
    }
    setButtonDisabled(true)
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
      onValuesChange={onValuesChange}
    >
      <Row gutter={24}>
        <Col lg={8} md={12} xs={24} className={style.relativeContainer}>
          <span className={style.mark}>*</span>
          <Form.Item
            className={style['ant-col']}
            label={t('company_name')}
            name="company-name"
            rules={[{ required: true, message: t('error_name') }]}
          >
            <Input placeholder={t('company_name')} />
          </Form.Item>
        </Col>
        <Col lg={8} md={12} xs={24} className={style.relativeContainer}>
          <span className={style.mark}>*</span>
          <Form.Item
            className={style['ant-col']}
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
      <div className={style.relativeContainer}>
        <span className={style.markParagraph}>*</span>
        <p className={style.paragraph}>{t('company_description')}</p>
      </div>
      <Tabs
        defaultActiveKey="en"
        type="line"
        hideAdd
        tabBarGutter={40}
        tabBarStyle={{ margin: '0 0 10px 30px', width: 85 }}
      >
        <TabPane tab="EN" key="en" forceRender={true}>
          <Row>
            <Col lg={16} md={24} xs={24}>
              <Form.Item name="en-desc">
                <TextArea
                  placeholder={t('company_description')}
                  name="english-desc"
                  autoSize={{ minRows: 6, maxRows: 10 }}
                  style={{ marginTop: '6px' }}
                />
              </Form.Item>
              <p className={descriptionErrorEn ? style.errorParagrah : style.hidden}>
                Both descriptions are requred
              </p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="SR" key="sr" forceRender={true}>
          <Row>
            <Col lg={16} md={24} xs={24}>
              <Form.Item name="sr-desc">
                <TextArea
                  placeholder={t('company_description')}
                  name="serbian-dec"
                  autoSize={{ minRows: 6, maxRows: 10 }}
                  style={{ marginTop: '6px' }}
                />
              </Form.Item>
              <p className={descriptionErrorSr ? style.errorParagrah : style.hidden}>
                Both descriptions are requred
              </p>
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
