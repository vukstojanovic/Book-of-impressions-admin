import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Form, Typography, Input, Button, Select, Space, Tabs, Card } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { useAuth } from '@/providers/authProvider'

const { Title } = Typography
const { TextArea } = Input
const { Option } = Select
const { TabPane } = Tabs

export const CreateNewForm = () => {
  const [selectedFormType, setSelectedFormType] = useState(null)
  const [showInfoQuestion, setShowInfoQuestion] = useState(false)
  const [form] = Form.useForm()

  const {
    user: { role },
  } = useAuth()

  const { t } = useTranslation('CreateNewForm')

  const handleSubmit = (values) => {
    setShowInfoQuestion(false)
    console.log('form submitted', values)
  }

  const onTypeChange = (value) => {
    setShowInfoQuestion(true)
    if (value === 'rating' || value === 'answer') {
      setSelectedFormType('oneQuestion')
      console.log('rating or answer was selected')
    }
    if (value === 'ratings') {
      setSelectedFormType('threeQuestions')
      console.log('ratings was selected')
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <>
      <Title level={2}>{t('main')}</Title>
      <Card>
        <Form
          requiredMark={false}
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
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
              <p style={{ marginBottom: '-10px' }}>{t('formDescription')}</p>
              <Tabs
                defaultActiveKey="en"
                type="line"
                hideAdd
                tabBarGutter={40}
                tabBarStyle={{ margin: '0 0 10px 30px', width: 85 }}
              >
                <TabPane tab="EN" key="en">
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
                <TabPane tab="SR" key="sr">
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
                name="form type"
                label={t('formType')}
                rules={[{ required: true, message: t('emptyType') }]}
              >
                <Select placeholder={t('formType')} onChange={onTypeChange}>
                  <Option value="rating">{t('rating')}</Option>
                  <Option value="ratings">{t('ratings')}</Option>
                  <Option value="answer">{t('answer')}</Option>
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
                      if (selectedFormType === 'oneQuestion' && fields.length >= 1) {
                        return Promise.reject(new Error(t(selectedFormType)))
                      }
                      if (selectedFormType === 'threeQuestions' && fields.length >= 3) {
                        return Promise.reject(new Error(t(selectedFormType)))
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, i) => {
                      console.log(errors)
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
                          <p onClick={() => remove(name)}>
                            {t('removeQuestion')}{' '}
                            <MinusCircleOutlined style={{ cursor: 'pointer', color: 'red' }} />
                          </p>
                        </div>
                      )
                    })}
                    <Form.Item>
                      <Button
                        size="middle"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        disabled={role !== 'Manager' || errors.length}
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
                  <Button type="primary" size={'large'} htmlType="submit">
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
