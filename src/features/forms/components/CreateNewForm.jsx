import { useState } from 'react'
import { Form, Typography, Input, Select, Button, Card } from 'antd'

const { Option } = Select
const { Title, Text } = Typography

export const CreateNewForm = () => {
  const [type, setType] = useState('type-1')
  const [question, setQuestion] = useState('')
  const [typeOneQuestion, setTypeOneQuestion] = useState([])
  const [typeTwoQuestion, setTypeTwoQuestion] = useState([])
  const [addNewForm] = Form.useForm()

  const handleAddQuestion = () => {
    if (!question) {
      alert('Please fill the question filed')
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

  const handleSubmit = ({ title, description, type }) => {
    if (type === 'type-1') {
      console.log(typeOneQuestion)
    } else {
      console.log(typeTwoQuestion)
    }

    console.log(title, description, type)
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
      <Title level={2}>Create New Form</Title>
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
          <Input allowClear={true} placeholder="Form Title" />
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
          <Input allowClear={true} placeholder="Form Description" />
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
          <Select value={type} onChange={handleSelectChange} placeholder="Form Type">
            <Option value="type-1">Type 1</Option>
            <Option value="type-2">Type 2</Option>
          </Select>
        </Form.Item>

        {type === 'type-1' ? (
          <Card style={{ margin: '1.75rem 0' }}>
            <Title level={4}>Question</Title>
            <Text>For this type of form you can add only 1 question!</Text>
            <div>
              <Input
                placeholder="Type a Question"
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
              Add Question
            </Button>
          </Card>
        ) : (
          <Card style={{ marginBottom: '1.75rem' }}>
            <Title level={4}>Questions</Title>
            <Text>For this type of form you can add maximum 3 questions!</Text>

            <div>
              <Input
                placeholder="Type a Question"
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
              Add Question
            </Button>
          </Card>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create New Form
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
