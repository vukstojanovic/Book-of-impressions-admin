import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Upload, Tabs, Button, Row, Col, Spin, Tag, Tooltip } from 'antd'
import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useUpdateCompanyInfo } from '../api/postCompanyInfo'
import { useGetCompanyInfo } from '../api/getCompanyInfo'

import style from './Settings.module.css'

import { useAuth } from '@/providers/authProvider'
import { beforeUpload } from '@/utils/beforeImageUpload'

export function Settings() {
  const { data: company, isLoading } = useGetCompanyInfo()

  const [descriptionErrorEn, setDescriptionErrorEn] = useState(false)
  const [descriptionErrorSr, setDescriptionErrorSr] = useState(false)

  const [selectedLogos, setSelectedLogos] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [tags, setTags] = useState(['Unremovable', 'Tag 2', 'Tag 3'])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState('')
  const inputRef = useRef(null)
  const editInputRef = useRef(null)

  const {
    user: { role },
  } = useAuth()

  const { t } = useTranslation('settings')

  const { TextArea } = Input
  const { TabPane } = Tabs
  const [form] = Form.useForm()

  const companyInfoMutation = useUpdateCompanyInfo({
    setButtonDisabled,
    t,
  })

  const onFinish = ({
    'company-name': name,
    'company-email': email,
    'en-desc': enDescription,
    'sr-desc': srDescription,
    logo,
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

    companyInfoMutation.mutate({ formData })
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
      return
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
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    console.log(newTags)
    setTags(newTags)
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }

    setInputVisible(false)
    setInputValue('')
  }

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...tags]
    newTags[editInputIndex] = editInputValue
    setTags(newTags)
    setEditInputIndex(-1)
    setInputValue('')
  }
  // Set Initial Form Values
  useEffect(() => {
    if (company) {
      form.setFieldsValue({
        'company-name': company.name,
        'company-email': company.email,
        'en-desc': company.description.filter((lang) => lang.key === 'en')[0]?.text || '',
        'sr-desc': company.description.filter((lang) => lang.key === 'sr')[0]?.text || '',
      })
    }
  }, [company])
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])
  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])

  if (isLoading)
    return (
      <Row align="middle" justify="center" style={{ minHeight: '30vh' }}>
        <Spin size="large" />
      </Row>
    )

  return (
    company && (
      <Form
        size="large"
        layout="vertical"
        requiredMark={false}
        form={form}
        style={{ backgroundColor: 'white', padding: '10px 30px' }}
        onFinish={onFinish}
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
                <Form.Item name="en-desc">
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
            showUploadList={(true, { showPreviewIcon: false })}
            defaultFileList={[
              {
                uid: '-1',
                name: 'company-logo.png',
                status: 'done',
                url: `${company.logo}`,
              },
            ]}
            fileList={selectedLogos}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            maxCount={1}
            disabled={role !== 'Manager'}
          >
            {uploadButton}
          </Upload>
        </Form.Item>
        <Col style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
          {tags.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  className={style.tagContent}
                  ref={editInputRef}
                  key={tag}
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              )
            }

            const isLongTag = tag.length > 20
            const tagElem = (
              <Tag
                style={{ padding: '4px 6px' }}
                key={tag}
                closable={true}
                onClose={() => handleClose(tag)}
              >
                <span
                  style={{ fontSize: '1rem' }}
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      setEditInputIndex(index)
                      setEditInputValue(tag)
                      e.preventDefault()
                    }
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            )
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            )
          })}
          {inputVisible && (
            <Input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag style={{ fontSize: '1rem', padding: '4px 6px' }} onClick={showInput}>
              <PlusOutlined /> New Tag
            </Tag>
          )}{' '}
        </Col>
        {role !== 'Manager' ? null : (
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" disabled={buttonDisabled ? true : false}>
              {t('submit')}
            </Button>
          </Form.Item>
        )}
      </Form>
    )
  )
}
