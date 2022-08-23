import { Form, Row, Col, Input, Radio, Select, Collapse, Button, DatePicker, Slider } from 'antd'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import moment from 'moment'

export const FilterComponent = ({
  hasName,
  hasEmail,
  hasRating,
  hasAnswer,
  hasFormType,
  hasDate,
  hasType,
  hasTitle,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [form] = Form.useForm()
  const dateFormat = 'YYYY-MM-DD'

  function handleFinish(formValues) {
    const valuesKeys = Object.keys(formValues)
    const modifiedObject = {}
    valuesKeys.forEach((key) => {
      if (
        (formValues[key] || formValues[key] === 0 || formValues[key] === false) &&
        !(Array.isArray(formValues[key]) && !formValues[key]?.length)
      ) {
        if (key === 'createdDate') {
          modifiedObject.fromCreatedDate = dayjs(formValues[key][0]?._d).format(dateFormat)
          modifiedObject.toCreatedDate = dayjs(formValues[key][1]?._d).format(dateFormat)
        } else if (key === 'rating') {
          modifiedObject.fromRating = formValues[key][0]
          modifiedObject.toRating = formValues[key][1]
        } else {
          modifiedObject[key] = formValues[key]
        }
      }
    })

    const modifiedObjectKeys = Object.keys(modifiedObject)

    modifiedObjectKeys.forEach((key) => {
      if (key === 'formType') {
        searchParams.delete('formType[]')
        modifiedObject[key]?.forEach((type) => {
          searchParams.append('formType[]', type)
        })
        setSearchParams(searchParams)
      } else {
        searchParams.delete(key)
        searchParams.set(key, modifiedObject[key])
        setSearchParams(searchParams)
      }
    })
  }

  function handleReset() {
    setSearchParams({})
    form.setFieldsValue({
      reviewName: '',
      reviewEmail: '',
      title: '',
      rating: [],
      answer: null,
      formType: [],
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
              reviewName: searchParams.get('reviewName'),
              reviewEmail: searchParams.get('reviewEmail'),
              rating:
                searchParams.get('fromRating') && searchParams.get('toRating')
                  ? [searchParams.get('fromRating'), searchParams.get('toRating')]
                  : [],
              answer: JSON.parse(searchParams.get('answer')),
              formType: searchParams.get('formType[]') ? searchParams.getAll('formType[]') : [],
              createdDate:
                searchParams.get('fromCreatedDate') && searchParams.get('toCreatedDate')
                  ? [
                      moment(searchParams.get('fromCreatedDate'), dateFormat),
                      moment(searchParams.get('toCreatedDate'), dateFormat),
                    ]
                  : [],
              title: searchParams.get('title'),
              type: searchParams.get('type') || [],
            }}
          >
            <Row gutter={16} wrap>
              {hasName && (
                <Col span={8}>
                  <Form.Item name="reviewName">
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
              )}
              {hasEmail && (
                <Col span={8}>
                  <Form.Item name="reviewEmail">
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
              )}
              {hasTitle && (
                <Col span={8}>
                  <Form.Item name="title">
                    <Input placeholder="Title" />
                  </Form.Item>
                </Col>
              )}
              {hasType && (
                <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Item name="type">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        minWidth: '150px',
                      }}
                      placeholder="Select type..."
                    >
                      <Select.Option key="Answer">Answer</Select.Option>
                      <Select.Option key="Rating">Rating</Select.Option>
                      <Select.Option key="Ratings">Ratings</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {hasDate && (
                <Col span={8}>
                  <Form.Item name="createdDate">
                    <DatePicker.RangePicker style={{ maxWidth: '300px' }} />
                  </Form.Item>
                </Col>
              )}
              {hasRating && (
                <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
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
                <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Item name="answer">
                    <Radio.Group>
                      <Radio value={true}>Like</Radio>
                      <Radio value={false}>Dislike</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              )}
              {hasFormType && (
                <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Item name="formType">
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        minWidth: '150px',
                      }}
                      placeholder="Select type..."
                    >
                      <Select.Option key="Answer">Answer</Select.Option>
                      <Select.Option key="Rating">Rating</Select.Option>
                      <Select.Option key="Ratings">Ratings</Select.Option>
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
