import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Upload, Tabs, Button, Row, Col } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useUpdateCompanyInfo } from '../api/postCompanyInfo'

import style from './Settings.module.css'

import { useAuth } from '@/providers/authProvider'
import { beforeUpload } from '@/utils/beforeImageUpload'

export function Settings() {
  const [descriptionErrorEn, setDescriptionErrorEn] = useState(false)
  const [descriptionErrorSr, setDescriptionErrorSr] = useState(false)
  const [image, setImage] = useState('')
  const [selectedLogos, setSelectedLogos] = useState(null)
  const [removeButton, setRemovedButton] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const {
    user: { role },
  } = useAuth()

  const { t } = useTranslation('settings')

  const { TextArea } = Input
  const { TabPane } = Tabs
  const [form] = Form.useForm()

  const companyInfoMutation = useUpdateCompanyInfo({ form, setSelectedLogos, setButtonDisabled, t })

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

    // to do: replace hardcoded id with dynamic
    companyInfoMutation.mutate('d1e350dd-8406-4c64-8a55-69901b040ad5', companyInfo)
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

  const handleChange = ({ file, fileList }) => {
    setSelectedLogos(fileList)
    if (removeButton) {
      setImage(null)
      return
    }

    setImage(file)
  }

  const onRemoveImage = () => {
    setRemovedButton(true)
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
                {t('error_description')}
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
                {t('error_description')}
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
          fileList={selectedLogos}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          onRemove={onRemoveImage}
          maxCount={1}
          disabled={role !== 'Manager'}
        >
          {uploadButton}
        </Upload>
      </Form.Item>
      {role !== 'Manager' ? null : (
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit" disabled={buttonDisabled ? true : false}>
            {t('submit')}
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}
