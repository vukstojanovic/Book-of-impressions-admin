import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Typography, Input, Select, Button, Card, message } from 'antd'

const { Option } = Select
const { Title, Text } = Typography

export const CreateNewForm = () => {
  const [type, setType] = useState('type-1')
  const [question, setQuestion] = useState('')
  const [typeOneQuestion, setTypeOneQuestion] = useState([])
  const [typeTwoQuestion, setTypeTwoQuestion] = useState([])
  const [addNewForm] = Form.useForm()

  const { t } = useTranslation('CreateNewForm')

  const handleAddQuestion = () => {
    if (!question) {
      message.error(t('fillQuestion'))
      return
    }
    if (type === 'type-1') {
      setTypeOneQuestion([...typeOneQuestion, { name: question }])
      setQuestion('')
    }

    if (type === 'type-2') {
      setTypeTwoQuestion([...typeTwoQuestion, { name: question }])
      setQuestion('')
    }
  }

  const handleSubmit = () => {
    message.success('You succesfully create a new form!')
    addNewForm.resetFields()
    setTypeOneQuestion([])
    setTypeTwoQuestion([])
    setType('type-1')
  }

  const handleSelectChange = (e) => {
    setType(e)
  }

  return (
    <>
      <Title level={2}>{t('main')}</Title>
      <Form form={addNewForm} onFinish={handleSubmit} size="large">
        <Form.Item
          style={{ width: '300px' }}
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input allowClear={true} placeholder={t('formTitle')} />
        </Form.Item>
        <Form.Item
          style={{ width: '300px' }}
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input allowClear={true} placeholder={t('formDescription')} />
        </Form.Item>
        <Form.Item
          style={{ width: '300px' }}
          name="type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select value={type} onChange={handleSelectChange} placeholder={t('formType')}>
            <Option value="type-1">{t('type1')}</Option>
            <Option value="type-2">{t('type2')}</Option>
          </Select>
        </Form.Item>

        {type === 'type-1' ? (
          <Card style={{ margin: '1.75rem 0' }}>
            <Title level={4}>{t('question')}</Title>
            <Text>{t('warning')}</Text>
            <div>
              <Input
                placeholder={t('inputQuestion')}
                size="large"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            {typeOneQuestion.map((question, i) => (
              <div
                key={i}
                style={{
                  marginTop: '10px',
                  padding: '15px 10px',
                  borderBottom: '0.5px solid black',
                }}
              >
                <Text key={i} style={{ fontSize: '1.25rem' }}>
                  {question.name}
                </Text>
              </div>
            ))}

            <Button
              style={{ display: 'block', marginTop: '15px' }}
              onClick={handleAddQuestion}
              disabled={typeOneQuestion.length >= 1}
            >
              {t('addQuestion')}
            </Button>
          </Card>
        ) : (
          <Card style={{ marginBottom: '1.75rem' }}>
            <Title level={4}>{t('question')}</Title>
            <Text>{t('warning2')}</Text>

            <div>
              <Input
                placeholder={t('inputQuestion')}
                size="large"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            {typeTwoQuestion.map((question, i) => (
              <div
                key={i}
                style={{
                  marginTop: '10px',
                  padding: '15px 10px',
                  borderBottom: '0.5px solid black',
                }}
              >
                <Text key={i} style={{ fontSize: '1.25rem' }}>
                  {question.name}
                </Text>
              </div>
            ))}

            <Button
              style={{ display: 'block', marginTop: '15px' }}
              onClick={handleAddQuestion}
              disabled={typeTwoQuestion.length >= 3}
            >
              {t('addQuestion')}
            </Button>
          </Card>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t('createNewForm')}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
