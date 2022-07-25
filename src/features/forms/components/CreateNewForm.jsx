import { useTranslation } from 'react-i18next'
import { Row, Col, Form, Typography, Input, Button, Select, Space, Tabs, Card } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography
const { TextArea } = Input
const { Option } = Select
const { TabPane } = Tabs

export const CreateNewForm = () => {
  const [form] = Form.useForm()

  const { t } = useTranslation('CreateNewForm')

  const handleSubmit = (values) => {
    console.log(values)
  }

  const onTypeChange = () => {
    console.log('type was changed')
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
          size="middle"
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
          <p style={{ marginBottom: '-10px' }}>{t('formDescription')}</p>
          <Tabs
            defaultActiveKey="en"
            type="line"
            hideAdd
            tabBarGutter={40}
            tabBarStyle={{ margin: '0 0 10px 30px', width: 78 }}
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
                  style={{ width: '60%', marginTop: '6px' }}
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
                  style={{ width: '60%', marginTop: '6px' }}
                />
              </Form.Item>
            </TabPane>
          </Tabs>
          <Row>
            <Col style={{ width: '60%' }}>
              <Form.Item
                name="form type"
                label={t('formType')}
                rules={[{ required: true, message: t('emptyType') }]}
              >
                <Select placeholder={t('formType')} onChange={onTypeChange}>
                  <Option value="type-1">{t('type1')}</Option>
                  <Option value="type-2">{t('type2')}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <p style={{ marginBottom: '15px' }}>{t('question')}</p>
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, i) => (
                  <div key={i}>
                    <Tabs
                      key={key}
                      defaultActiveKey="en"
                      type="line"
                      hideAdd
                      tabBarGutter={40}
                      tabBarStyle={{ margin: '0 0 10px 30px', width: 78 }}
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
                            style={{ width: '60%', marginTop: '6px' }}
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
                            style={{ width: '60%', marginTop: '6px' }}
                          />
                        </Form.Item>
                      </TabPane>
                    </Tabs>
                    <p onClick={() => remove(name)}>
                      {t('removeQuestion')}{' '}
                      <MinusCircleOutlined style={{ cursor: 'pointer', color: 'red' }} />
                    </p>
                  </div>
                ))}
                <Form.Item style={{ width: '60%' }}>
                  <Button size="middle" onClick={() => add()} block icon={<PlusOutlined />}>
                    {t('addAnoterQuestion')}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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
        </Form>
      </Card>
    </>
  )
}
