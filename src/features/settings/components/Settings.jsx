import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Upload, Tabs, Button, Row, Col, Spin, message } from 'antd'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useUpdateCompanyInfo } from '../api/postCompanyInfo'
import { useUpdateCompanyMeta } from '../api/postCompanyMeta'
import { useGetCompanyInfo } from '../api/getCompanyInfo'

import { Tags } from './Tags'
import style from './Settings.module.css'

import { SpinnerWithBackdrop } from '@/components/spinners'
import { useAuth } from '@/providers/authProvider'
import { beforeUpload } from '@/utils/beforeImageUpload'
import { descriptionValidationProps } from '@/utils/descriptionValidation'

export function Settings() {
  const { data: company, isLoading } = useGetCompanyInfo()

  const [descriptionErrorEn, setDescriptionErrorEn] = useState(false)
  const [descriptionErrorSr, setDescriptionErrorSr] = useState(false)

  const [selectedLogos, setSelectedLogos] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const {
    user: { role },
  } = useAuth()

  const { t } = useTranslation('settings')

  const { TextArea } = Input
  const { TabPane } = Tabs
  const [form] = Form.useForm()

  const { mutateAsync: companyInfoMutate, isLoading: infoMutateIsLoading } = useUpdateCompanyInfo({
    setButtonDisabled,
    t,
  })

  const { mutateAsync: companyMetaMutate, isLoading: metaMutateIsLoading } = useUpdateCompanyMeta({
    t,
  })

  const onFinish = ({
    'company-name': name,
    'company-email': email,
    'en-desc': enDescription,
    'sr-desc': srDescription,
    logo,
    google_place_ids,
    tripadvisor_urls,
  }) => {
    const formData = new FormData()
    const desc = [
      {
        key: 'en',
        text: enDescription,
      },
      {
        key: 'sr',
        text: srDescription,
      },
    ]

    if (logo) {
      formData.append('logo', logo[0].originFileObj)
    }
    formData.append('name', name)
    formData.append('email', email)
    formData.append('description', JSON.stringify(desc))

    const mutationArray = []
    mutationArray.push(companyInfoMutate({ formData }))

    if (
      JSON.stringify(company.meta.tripadvisor_urls) !== JSON.stringify(tripadvisor_urls) ||
      JSON.stringify(company.meta.google_place_ids) !== JSON.stringify(google_place_ids)
    ) {
      mutationArray.push(companyMetaMutate({ google_place_ids, tripadvisor_urls }))
    }
    Promise.all(mutationArray)
      .then(() => message.success(t('submit_success'), 3))
      .catch(() => message.error(t('submit_error'), 3))
  }

  const onFieldsChange = (_, allFields) => {
    let errorInValue = false
    allFields.forEach((field) => {
      if (
        field.name[0] === 'company-name' ||
        field.name[0] === 'company-email' ||
        field.name[0] === 'en-desc' ||
        field.name[0] === 'sr-desc'
      )
        if (field.errors.length !== 0 || !field.value) {
          setButtonDisabled(true)
          errorInValue = true
        }
    })
    if (errorInValue === true) {
      setButtonDisabled(true)
      return
    }

    setButtonDisabled(false)
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

    if (email.trim(' ') && name.trim(' ') && enDesc.trim(' ') && srDesc.trim(' ')) {
      setButtonDisabled(false)
    }

    setButtonDisabled(true)
  }

  const handleChange = ({ fileList }) => {
    setSelectedLogos(fileList)
    setButtonDisabled(false)
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
  // Set Initial Form Values
  useEffect(() => {
    if (company) {
      form.setFieldsValue({
        'company-name': company.name || '',
        'company-email': company.email || '',
        'en-desc': company.description.filter((lang) => lang.key === 'en')[0]?.text || '',
        'sr-desc': company.description.filter((lang) => lang.key === 'sr')[0]?.text || '',
        tripadvisor_urls: company.meta.tripadvisor_urls || '',
        google_place_ids: company.meta.google_place_ids || '',
      })
    }
  }, [company])

  if (isLoading)
    return (
      <Row align="middle" justify="center" style={{ minHeight: '30vh' }}>
        <Spin size="large" />
      </Row>
    )

  return (
    company && (
      <>
        {metaMutateIsLoading || infoMutateIsLoading ? <SpinnerWithBackdrop /> : null}
        <Form
          size="large"
          layout="vertical"
          requiredMark={false}
          form={form}
          style={{ backgroundColor: 'white', padding: '10px 30px' }}
          onFinish={onFinish}
          onFieldsChange={onFieldsChange}
          onValuesChange={onValuesChange}
        >
          <Row gutter={24}>
            <Col lg={8} md={12} xs={24} className={style.relativeContainer}>
              <span className={style.mark}>*</span>
              <Form.Item
                dependencies={[company]}
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
                  <Form.Item name="en-desc" rules={[...descriptionValidationProps(t)]}>
                    <TextArea
                      placeholder={`${t('company_description')}`}
                      name="english-desc"
                      autoSize={{ minRows: 3, maxRows: 10 }}
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
                  <Form.Item
                    name="sr-desc"
                    initialValue={
                      company.description?.filter((lang) => lang.key === 'sr')[0]?.text || ''
                    }
                    rules={[...descriptionValidationProps(t)]}
                  >
                    <TextArea
                      placeholder={t('company_description')}
                      name="serbian-dec"
                      autoSize={{ minRows: 3, maxRows: 10 }}
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
          <Form.Item
            label={t('company_logo')}
            name={'logo'}
            valuePropName="fileList"
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
              className="avatar-uploader"
              showUploadList={(true, { showPreviewIcon: false, showRemoveIcon: false })}
              defaultFileList={
                company.logo
                  ? [
                      {
                        uid: '-1',
                        name: 'company-logo.png',
                        status: 'done',
                        url: `${company.logo}`,
                      },
                    ]
                  : []
              }
              fileList={selectedLogos ? selectedLogos : null}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              maxCount={1}
              disabled={role !== 'Manager'}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item initialValue={company.meta.google_place_ids} name="google_place_ids">
            <Tags t={t} form={form} placeholderText={t('add_google_place_id')} />
          </Form.Item>
          <Form.Item name="tripadvisor_urls">
            <Tags t={t} form={form} placeholderText={t('add_tripadvisor_url')} />
          </Form.Item>
          {role !== 'Manager' ? null : (
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" disabled={buttonDisabled ? true : false}>
                {t('submit')}
              </Button>
            </Form.Item>
          )}
        </Form>
      </>
    )
  )
}
