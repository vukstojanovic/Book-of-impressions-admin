import { Form, Row, Col, Input, Radio, Select, Collapse, Button, DatePicker, Slider } from 'antd'
import { useLocation, useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import moment from 'moment'

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
  const dateFormat = 'YYYY-MM-DD'
  const location = useLocation()

  console.log(decodeURIComponent(location.search))

  function handleFinish({
    name: reviewName,
    email: reviewEmail,
    rating,
    answer,
    type,
    createdDate,
  }) {
    const [fromRating, toRating] = rating
    const [fromCreatedDate, toCreatedDate] = createdDate

    const modifiedObject = {
      reviewName,
      reviewEmail,
      fromRating,
      toRating,
      answer,
      type,
      fromCreatedDate: fromCreatedDate && dayjs(fromCreatedDate?._d).format(dateFormat),
      toCreatedDate: toCreatedDate && dayjs(toCreatedDate?._d).format(dateFormat),
    }
    const modifiedObjectKeys = Object.keys(modifiedObject)

    modifiedObjectKeys.forEach((key) => {
      if (key === 'type') {
        modifiedObject[key].forEach((type) => {
          searchParams.append('formType[]', type)
        })
        setSearchParams(searchParams)
      } else if (modifiedObject[key]) {
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
      rating: [],
      answer: null,
      type: [],
      createdDate: [],
    })
  }

  const marks = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
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
              rating: [searchParams.get('fromRating'), searchParams.get('toRating')],
              answer: searchParams.get('answer'),
              type: searchParams.get('type') || [],
              createdDate:
                searchParams.get('fromCreatedDate') && searchParams.get('toCreatedDate')
                  ? [
                      moment(searchParams.get('fromCreatedDate'), dateFormat),
                      moment(searchParams.get('toCreatedDate'), dateFormat),
                    ]
                  : [],
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
                    <Slider
                      range
                      min={0}
                      max={5}
                      step={0.5}
                      marks={marks}
                      style={{ width: '200px' }}
                    />
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
