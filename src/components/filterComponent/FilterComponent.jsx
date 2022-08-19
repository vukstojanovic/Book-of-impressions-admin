import { Form, Row, Col, Input, Rate, Radio, Select, Collapse, Button, DatePicker } from 'antd'
import { useSearchParams } from 'react-router-dom'

export const FilterComponent = ({
  hasName = true,
  hasEmail,
  hasRating,
  hasAnswer,
  hasType,
  hasDate,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [form] = Form.useForm()

  function handleFinish({
    name: reviewName,
    email: reviewEmail,
    rating,
    answer,
    type,
    createdDate,
  }) {
    console.log(createdDate)
    const modifiedObject = { reviewName, reviewEmail, rating, answer, type, createdDate }
    const modifiedObjectKeys = Object.keys(modifiedObject)

    modifiedObjectKeys.forEach((key) => {
      if (modifiedObject[key] && modifiedObject[key]?.length) {
        searchParams.set(key, modifiedObject[key])
        setSearchParams(searchParams)
      } else {
        searchParams.delete(key)
        setSearchParams(searchParams)
      }
    })
  }

  function handleChange(value) {
    console.log(value)
  }

  function handleReset() {
    setSearchParams({})
    form.setFieldsValue({
      name: '',
      email: '',
      rating: 0,
      answer: null,
      type: [],
      createdDate: '',
    })
  }

  return (
    <>
      <Collapse style={{ marginBottom: '25px' }}>
        <Collapse.Panel header="Filters">
          <Form
            form={form}
            onFinish={handleFinish}
            style={{ marginBottom: '20px' }}
            initialValues={{
              name: searchParams.get('reviewName'),
              email: searchParams.get('reviewEmail'),
              rating: searchParams.get('rating'),
              answer: searchParams.get('answer'),
              type: searchParams.get('type'),
              createdDate: searchParams.get('createdDate'),
            }}
          >
            <Row gutter={16}>
              {hasName && (
                <Col span={8}>
                  <Form.Item name="name">
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
              )}
              {hasEmail && (
                <Col span={8}>
                  <Form.Item name="email">
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
              )}
              {hasDate && (
                <Col span={8}>
                  <Form.Item name="createdDate">
                    <DatePicker.RangePicker style={{ width: '300px' }} />
                  </Form.Item>
                </Col>
              )}
              {hasRating && (
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Item name="rating">
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
              )}
              {hasAnswer && (
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Item name="answer">
                    <Radio.Group>
                      <Radio value="like">Like</Radio>
                      <Radio value="dislike">Dislike</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              )}
              {hasType && (
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Item name="type">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        minWidth: '150px',
                      }}
                      placeholder="Select type..."
                      onChange={handleChange}
                    >
                      <Select.Option key="answer">Answer</Select.Option>
                      <Select.Option key="rating">Rating</Select.Option>
                      <Select.Option key="ratings">Ratings</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Row gutter={[10, 0]} justify="end">
              <Col>
                <Form.Item>
                  <Button onClick={handleReset}>Reset filters</Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Filter
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Collapse.Panel>
      </Collapse>
    </>
  )
}
