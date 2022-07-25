import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Form, Typography, Input, Button, Select, Space } from 'antd'

const { Title } = Typography
const { TextArea } = Input
const { Option } = Select

export const CreateNewForm = () => {
  const [descriptionLanguage, setDescriptionLanguage] = useState('EN')
  const [questionLanguage, setQuestionLanguage] = useState('EN')
  // const [questions, setQuestions] = useState([])
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
      <Form form={form} onFinish={handleSubmit} layout="vertical" size="large">
        <Row>
          <Col sm={24} md={12} lg={8}>
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
          <Col lg={24} md={24} sm={24}>
            <Button onClick={() => setDescriptionLanguage('EN')}>EN</Button>
            <Button onClick={() => setDescriptionLanguage('SR')}>SR</Button>
            <Form.Item
              label={t('formDescription')}
              name="Form description"
              rules={[{ required: true, message: t('emptyDescription') }]}
            >
              {descriptionLanguage === 'EN' ? (
                <TextArea
                  rows={2}
                  placeholder={`${t('descriptionFor')} ${descriptionLanguage}`}
                ></TextArea>
              ) : null}
              {descriptionLanguage === 'SR' ? (
                <TextArea
                  rows={2}
                  placeholder={`${t('descriptionFor')} ${descriptionLanguage}`}
                ></TextArea>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col lg={24} md={24} sm={24}>
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
        <Row>
          <Col lg={24} md={24} sm={24} style={{ marginTop: '10px' }}>
            <Button onClick={() => setQuestionLanguage('EN')}>EN</Button>
            <Button onClick={() => setQuestionLanguage('SR')}>SR</Button>
            <Form.Item
              label={t('question')}
              name="questions"
              rules={[{ required: true, message: t('fillQuestion') }]}
            >
              {questionLanguage === 'EN' ? (
                <TextArea
                  rows={2}
                  placeholder={`${t('inputQuestion')} ${questionLanguage}`}
                ></TextArea>
              ) : null}
              {questionLanguage === 'SR' ? (
                <TextArea
                  rows={2}
                  placeholder={`${t('inputQuestion')} ${questionLanguage}`}
                ></TextArea>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button>{t('addAnoterQuestion')}</Button>
          </Col>
        </Row>
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
    </>
  )
}
