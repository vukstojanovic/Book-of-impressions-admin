import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Form, Typography, Input, Button, Select, Space, Tabs, Card, Spin } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useSearchParams } from 'react-router-dom'

import { useGetForm } from '../api/getForm'
import { useEditFormQuery } from '../api/editForm'
import { usePostFormQuery } from '../api/postForm'

import style from './EditOrPostForm.module.css'

import { SpinnerWithBackdrop } from '@/components/spinners'
import { useAuth } from '@/providers/authProvider'
import { descriptionValidationProps } from '@/utils/descriptionValidation'

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

  const { mutate: editFormData, isLoading: editMutationIsLoading } = useEditFormQuery({
    form,
    setShowInfoQuestion,
    t,
  })
  const { mutate: postFormData, isLoading: postMutationIsLoading } = usePostFormQuery({
    form,
    setShowInfoQuestion,
    t,
  })
  const handleSubmit = ({
    title,
    ['en-desc']: enDescription,
    ['sr-desc']: srDescription,
    ['form-type']: formType,
    questions,
  }) => {
    const formattedQuestionsPost = questions.map((question) => {
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

    const formattedQuestionsEdit = questions.map((question, i) => {
      const { ['question-en']: enDesc, ['question-sr']: srDesc } = question
      return {
        id: data?.questions[i]?.id,
        texts: [
          {
            key: 'sr',
            text: srDesc,
          },
          {
            key: 'en',
            text: enDesc,
          },
        ],
      }
    })

    const formDataPost = {
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
      questions: formattedQuestionsPost,
    }

    const formDataEdit = {
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
      questions: formattedQuestionsEdit,
    }

    if (type === 'edit') return editFormData({ data: formDataEdit, id })

    if (type === 'post') return postFormData(formDataPost)
  }

  const onTypeChange = async (value) => {
    setShowInfoQuestion(true)
    await form.resetFields(['questions'])
    const questionLength = form.getFieldsValue().questions?.length
    const questions = form.getFieldsValue().questions
    if (value === 'Rating' || value === 'Answer') {
      setSelectedFormType('oneQuestion')

      if (questionLength !== 1) {
        setSubmitButton(true)
      }

      if (questionLength >= 1) {
        setDisabledButton(true)
      } else {
        setDisabledButton(false)
      }
      return
    }

    if (value === 'Ratings') {
      setSelectedFormType('threeQuestions')
      if (!questionLength) {
        setDisabledButton(false)
        setSubmitButton(true)
        return
      }

      checkQuestions(questions)

      if (questionLength >= 3) {
        setDisabledButton(true)
      } else {
        setDisabledButton(false)
      }

      return
    }
  }

  const checkQuestions = (questions) => {
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
    return enable
  }

  const onFieldsChange = (changedFields, allFields) => {
    if (changedFields[0].name.length === 1 && changedFields[0].name[0] === 'questions') {
      const questions = changedFields[0].value

      if (questions.length === 0) {
        setDisabledButton(false)
        return
      }

      if (selectedFormType === 'oneQuestion' && questions.length !== 1) {
        setSubmitButton(true)
        return
      }
      const checkedQuestionsOnFieldChange = checkQuestions(questions)

      let missingValue = false
      allFields.forEach((field) => {
        if (!field.value) {
          setSubmitButton(true)
          missingValue = true
        }
        if (!missingValue && checkedQuestionsOnFieldChange) {
          setSubmitButton(false)
        }
      })
    }
  }

  const onValuesChange = (
    _,
    { ['en-desc']: enDesc, ['sr-desc']: srDesc, ['form-type']: formType, title, questions }
  ) => {
    if (questions && selectedFormType === 'oneQuestion' && questions.length !== 1) {
      setSubmitButton(true)
      return
    }

    if (questions?.length === 0) {
      return setSubmitButton(true)
    }

    const checkedQuestions = checkQuestions(questions)

    if (!enDesc || !srDesc || !formType || !title || !checkedQuestions) {
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
    if (formType === 'oneQuestion' && formLength >= 1) {
      setDisabledButton(true)
      return
    }

    if (formType === 'threeQuestions' && formLength >= 3) {
      setDisabledButton(true)
      return
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
        setShowInfoQuestion(true)
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
      {editMutationIsLoading || postMutationIsLoading ? <SpinnerWithBackdrop /> : null}
      <Title level={2}>{type === 'edit' ? t('edit_main') : t('main')}</Title>
      <Card>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          onValuesChange={onValuesChange}
          onFieldsChange={onFieldsChange}
        >
          <Row>
            <Col sm={24} md={12} lg={9}>
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
                <Input maxLength={20} allowClear={true} />
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
                      ...descriptionValidationProps(t),
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={150}
                      placeholder="Form description"
                      name="english-desc"
                      autoSize={{ minRows: 3, maxRows: 10 }}
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
                      ...descriptionValidationProps(t),
                    ]}
                  >
                    <TextArea
                      showCount
                      maxLength={150}
                      placeholder="Opis forme"
                      name="serbian-dec"
                      autoSize={{ minRows: 3, maxRows: 10 }}
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
                                <Input
                                  maxLength={100}
                                  placeholder="Question"
                                  name="question-en"
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
                                <Input
                                  maxLength={100}
                                  placeholder="Pitanje"
                                  name="question-sr"
                                  style={{ marginTop: '6px' }}
                                />
                              </Form.Item>
                            </TabPane>
                          </Tabs>
                          <p
                            onClick={() => {
                              remove(name)
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
