import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Form, Typography, Input, Button, Select, Space, Tabs, Card, Spin } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'

import { useGetForm } from '../api/getForm'
import { useEditFormQuery } from '../api/editForm'
import { usePostFormQuery } from '../api/postForm'

import style from './EditOrPostForm.module.css'

import { useAuth } from '@/providers/authProvider'

const { Title } = Typography
const { TextArea } = Input
const { Option } = Select
const { TabPane } = Tabs

export const EditOrPostForm = ({ type }) => {
  const [param] = useSearchParams()
  const id = param.get('id')
  const { data, isLoading } = useGetForm({ id })

  const [selectedFormType, setSelectedFormType] = useState(null)
  const [showInfoQuestion, setShowInfoQuestion] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)
  const [submitButton, setSubmitButton] = useState(true)
  const [form] = Form.useForm()

  const {
    user: { role },
  } = useAuth()

  const { t } = useTranslation('CreateNewForm')

  const editFormData = useEditFormQuery({ form, setShowInfoQuestion, t })
  const postFormData = usePostFormQuery({ form, setShowInfoQuestion, t })

  const handleSubmit = ({
    title,
    ['en-desc']: enDescription,
    ['sr-desc']: srDescription,
    ['form-type']: formType,
    questions,
  }) => {
    const formattedQuestions = questions.map((question) => {
      return {
        texts: [
          {
            key: 'en',
            text: question['question-en'],
          },
          {
            key: 'sr',
            text: question['question-sr'],
          },
        ],
      }
    })

    const formData = {
      title,
      type: formType,
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
      questions: formattedQuestions,
    }

    if (type === 'edit') return editFormData.mutate({ data: formData, id })

    if (type === 'post') return postFormData.mutate(formData)
  }

  const onTypeChange = (value) => {
    setShowInfoQuestion(true)
    const questionLength = form.getFieldsValue().questions?.length
    console.log(questionLength)
    if (value === 'Rating' || value === 'Answer') {
      setSelectedFormType('oneQuestion')
      if (questionLength >= 1) {
        setDisabledButton(true)
      } else {
        setDisabledButton(false)
      }
      return
    }
    if (value === 'Ratings') {
      setSelectedFormType('threeQuestions')
      if (questionLength >= 3) {
        setDisabledButton(true)
      } else {
        setDisabledButton(false)
      }
      return
    }
  }

  const onValuesChange = (
    _,
    { ['en-desc']: enDesc, ['sr-desc']: srDesc, ['form-type']: formType, title, questions }
  ) => {
    let enable = true

    questions?.map((question) => {
      if (!question['question-sr']?.trim() || !question['question-en']?.trim()) {
        enable = false
        return
      }

      if (!enable) return

      if (question['question-en'] !== '' || question['question-sr'] !== '') {
        enable = true
      }
    })

    if (questions?.length === 0) {
      return setSubmitButton(true)
    }

    if (!enDesc || !srDesc || !formType || !title || !enable) {
      setSubmitButton(true)
      return
    }

    if (form.isFieldsTouched()) {
      setSubmitButton(false)
    }
  }

  const onReset = () => {
    setShowInfoQuestion(false)
    form.resetFields()
  }

  const handleDisabledButton = ({ formType, formLength }) => {
    if (formLength === 0) {
      return setSubmitButton(true)
    }

    if (formType === 'oneQuestion' && formLength >= 1) {
      return setDisabledButton(true)
    }

    if (formType === 'threeQuestions' && formLength >= 3) {
      return setDisabledButton(true)
    }
  }

  useEffect(() => {
    if (type === 'edit') {
      if (data) {
        setSelectedFormType(`${data.type === 'Ratings' ? 'threeQuestions' : 'oneQuestion'}`)

        const initialQuestions = data.questions.map(({ texts }) => ({
          'question-sr': texts.filter((lang) => lang.key === 'sr')[0]?.text,
          'question-en': texts.filter((lang) => lang.key === 'en')[0]?.text,
        }))

        form.setFieldsValue({
          title: data.title,
          'form-type': data.type,
          'en-desc': data.description.filter((lang) => lang.key === 'en')[0]?.text,
          'sr-desc': data.description.filter((lang) => lang.key === 'sr')[0]?.text,
          questions: initialQuestions,
        })

        handleDisabledButton({
          formType: `${data.type === 'Ratings' ? 'threeQuestions' : 'oneQuestion'}`,
          formLength: data.questions.length,
        })
      }
    }
  }, [data])

  if (type === 'edit') {
    if (isLoading || selectedFormType === null)
      return (
        <Row align="middle" justify="center" style={{ minHeight: '30vh' }}>
          <Spin size="large" />
        </Row>
      )
  }
  return (
    <>
      <Title level={2}>{t('edit_main')}</Title>
      <Card>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          onValuesChange={onValuesChange}
        >
          <Row>
            <Col sm={24} md={12} lg={6}>
              <Form.Item
                label={t('formTitle')}
                name="title"
                rules={[
                  {
                    required: true,
                    message: t('emptyTitle'),
                  },
                ]}
              >
                <Input allowClear={true} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={18} lg={14}>
              <p className={style.formDescription}>{t('formDescription')}</p>
              <Tabs
                defaultActiveKey="en"
                type="line"
                hideAdd
                tabBarGutter={40}
                tabBarStyle={{ margin: '0 0 10px 30px', width: 85 }}
              >
                <TabPane tab="EN" key="en" forceRender>
                  <Form.Item
                    name="en-desc"
                    rules={[
                      {
                        required: true,
                        message: t('emptyDescription'),
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Form description"
                      name="english-desc"
                      autoSize={{ minRows: 6, maxRows: 10 }}
                      style={{ marginTop: '6px' }}
                    />
                  </Form.Item>
                </TabPane>
                <TabPane tab="SR" key="sr" forceRender>
                  <Form.Item
                    name="sr-desc"
                    rules={[
                      {
                        required: true,
                        message: t('emptyDescription'),
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Opis forme"
                      name="serbian-dec"
                      autoSize={{ minRows: 6, maxRows: 10 }}
                      style={{ marginTop: '6px' }}
                    />
                  </Form.Item>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={18} lg={14}>
              <Form.Item
                name="form-type"
                label={t('formType')}
                rules={[{ required: true, message: t('emptyType') }]}
              >
                <Select placeholder={t('formType')} onChange={onTypeChange}>
                  <Option value="Rating">{t('rating')}</Option>
                  <Option value="Ratings">{t('ratings')}</Option>
                  <Option value="Answer">{t('answer')}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} md={18} lg={14}>
              <p style={{ marginBottom: '15px' }}>
                {t('question')} {showInfoQuestion && <span>({t(selectedFormType)})</span>}
              </p>
              <Form.List
                name="questions"
                rules={[
                  {
                    validator: async (_, fields) => {
                      console.log(fields.length)
                      handleDisabledButton({
                        formType: selectedFormType,
                        formLength: fields.length,
                      })
                    },
                  },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, i) => {
                      return (
                        <div key={i}>
                          <Tabs
                            key={key}
                            defaultActiveKey="en"
                            type="line"
                            hideAdd
                            tabBarGutter={40}
                            tabBarStyle={{ margin: '0 0 10px 30px', width: 85 }}
                          >
                            <TabPane tab="EN" key="en">
                              <Form.Item
                                {...restField}
                                name={[name, 'question-en']}
                                rules={[
                                  {
                                    required: true,
                                    message: t('fillQuestion'),
                                  },
                                ]}
                              >
                                <TextArea
                                  placeholder="Question"
                                  name="question-en"
                                  autoSize={{ minRows: 6, maxRows: 10 }}
                                  style={{ marginTop: '6px' }}
                                />
                              </Form.Item>
                            </TabPane>
                            <TabPane tab="SR" key="sr">
                              <Form.Item
                                name={[name, 'question-sr']}
                                rules={[
                                  {
                                    required: true,
                                    message: t('fillQuestion'),
                                  },
                                ]}
                              >
                                <TextArea
                                  placeholder="Pitanje"
                                  name="question-sr"
                                  autoSize={{ minRows: 6, maxRows: 10 }}
                                  style={{ marginTop: '6px' }}
                                />
                              </Form.Item>
                            </TabPane>
                          </Tabs>
                          <p
                            onClick={() => {
                              remove(name)
                              console.log('Name:', name, 'FIELDS:', fields)
                              setDisabledButton(false)
                            }}
                          >
                            {t('removeQuestion')}{' '}
                            <MinusCircleOutlined style={{ cursor: 'pointer', color: 'red' }} />
                          </p>
                        </div>
                      )
                    })}
                    <Form.Item>
                      <Button
                        size="middle"
                        onClick={() => {
                          setSubmitButton(true)
                          add({ 'question-en': '', 'question-sr': '' })
                        }}
                        block
                        icon={<PlusOutlined />}
                        disabled={role !== 'Manager' || disabledButton || !selectedFormType}
                      >
                        {t('addAnoterQuestion')}
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
          {role !== 'Manager' ? null : (
            <Row justify="end">
              <Col style={{ marginTop: '25px' }}>
                <Space size={'large'}>
                  <Button size={'large'} onClick={onReset}>
                    {t('cancel')}
                  </Button>
                  <Button type="primary" size={'large'} htmlType="submit" disabled={submitButton}>
                    {t('create')}
                  </Button>
                </Space>
              </Col>
            </Row>
          )}
        </Form>
      </Card>
    </>
  )
}
