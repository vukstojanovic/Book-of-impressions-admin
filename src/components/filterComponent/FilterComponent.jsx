import { Form, Row, Col, Input, Radio, Select, Collapse, Button, DatePicker, Slider } from 'antd'
import { useSearchParams } from 'react-router-dom'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('Filters')

  function handleFinish(formValues) {
    for (const key of searchParams.keys()) {
      searchParams.delete(key)
    }
    setSearchParams(searchParams)

    const valuesKeys = Object.keys(formValues)
    const modifiedObject = {}

    valuesKeys.forEach((key) => {
      if (
        (formValues[key] || formValues[key] === 0 || formValues[key] === false) &&
        !(Array.isArray(formValues[key]) && !formValues[key]?.length)
      ) {
        if (key === 'createdDate') {
          modifiedObject.fromCreatedDate = moment(formValues[key][0]?._d).format(dateFormat)
          modifiedObject.toCreatedDate = moment(formValues[key][1]?._d).format(dateFormat)
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
        <Collapse.Panel header={t('filter')}>
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
                <Col>
                  <Form.Item name="reviewName">
                    <Input placeholder={t('name')} style={{ maxWidth: '300px' }} />
                  </Form.Item>
                </Col>
              )}
              {hasEmail && (
                <Col>
                  <Form.Item name="reviewEmail">
                    <Input placeholder={t('email')} style={{ maxWidth: '250px' }} />
                  </Form.Item>
                </Col>
              )}
              {hasTitle && (
                <Col>
                  <Form.Item name="title">
                    <Input placeholder={t('title')} style={{ maxWidth: '250px' }} />
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
                        minWidth: '200px',
                      }}
                      placeholder={t('type')}
                    >
                      <Select.Option key="Answer">{t('answer')}</Select.Option>
                      <Select.Option key="Rating">{t('rating')}</Select.Option>
                      <Select.Option key="Ratings">{t('ratings')}</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {hasDate && (
                <Col>
                  <Form.Item name="createdDate">
                    <DatePicker.RangePicker
                      style={{ maxWidth: '250px' }}
                      placeholder={[t('start_date'), t('end_date')]}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Row gutter={16} wrap>
              {hasRating && (
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Item name="rating" style={{ marginBottom: 0 }}>
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
                  <Form.Item name="answer" style={{ marginBottom: 0 }}>
                    <Radio.Group>
                      <Radio value={true}>{t('like')}</Radio>
                      <Radio value={false}>{t('dislike')}</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              )}
              {hasFormType && (
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Item name="formType" style={{ marginBottom: 0 }}>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{
                        minWidth: '200px',
                      }}
                      placeholder={t('select_form_type')}
                    >
                      <Select.Option key="Answer">{t('answer')}</Select.Option>
                      <Select.Option key="Rating">{t('rating')}</Select.Option>
                      <Select.Option key="Ratings">{t('ratings')}</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Row gutter={[10, 0]} justify="end" style={{ marginTop: '10px' }}>
              <Col>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button onClick={handleReset}>{t('reset_filters')}</Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button htmlType="submit" type="primary">
                    {t('filter')}
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
