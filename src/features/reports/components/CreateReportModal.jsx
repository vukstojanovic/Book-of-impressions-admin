import { useEffect } from 'react'
import { Spin, DatePicker, Input, Modal, Form, Select, Col } from 'antd'

import { useCreateNewReport } from '../api/createNewReport.js'

import { useSelectDate } from '@/hooks/useSelectDate'
import { SelectDateRange } from '@/components/buttons'
import { useForms } from '@/features/forms/api/getForms'
export const CreateReportModal = ({ t, isCreateReportModalOpen, handleCloseCreateReportModal }) => {
  const [form] = Form.useForm()

  const [selectDateRange, state] = useSelectDate()

  const { mutate: createReport } = useCreateNewReport({ t })

  const { data: forms, isLoading } = useForms('')

  const { Option } = Select

  function onFieldsChange(values) {
    selectDateRange({ values, form })
  }

  const handleSubmitReports = (values) => {
    const data = {
      name: values.name,
      formIds: values.forms,
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
    }
    createReport(data)
    handleCloseCreateReportModal()
  }

  useEffect(() => {
    form.setFieldsValue({ selectedDateRange: 'today' })
    selectDateRange({ values: [{ value: 'today' }], form })
  }, [])

  if (isLoading)
    return (
      <Col
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          display: 'grid',
          zIndex: 1000,
          justifyItems: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0, 0.6)',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Spin size="large" />
      </Col>
    )

  return (
    <Modal
      as="form"
      visible={isCreateReportModalOpen}
      okText={t('generate')}
      cancelText={t('cancel')}
      centered
      title={t('create_new_report')}
      onCancel={handleCloseCreateReportModal}
      okButtonProps={{ htmlType: 'submit', form: 'report-form', disabled: form[0] === 0 }}
    >
      <Form
        onFieldsChange={onFieldsChange}
        form={form}
        onFinish={handleSubmitReports}
        layout="vertical"
        name="report-form"
        disabled={form[1] === 0}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: t('error_name'),
            },
          ]}
          label={t('label_name')}
          name="name"
        >
          <Input placeholder={t('label_name')} allowClear />
        </Form.Item>

        <SelectDateRange required />
        {state.custom && (
          <Col>
            <Form.Item
              label=""
              rules={[
                {
                  required: true,
                  message: t('error_date'),
                },
              ]}
              name="pickedDate"
            >
              <DatePicker.RangePicker style={{ maxWidth: '250px' }} />
            </Form.Item>
          </Col>
        )}
        <Form.Item
          rules={[
            {
              required: true,
              message: t('error_formIds'),
            },
          ]}
          disabled
          label={t('label_forms')}
          name="forms"
        >
          <Select
            placeholder={t('label_forms')}
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            disabled={forms[1] === 0}
          >
            {forms[0].map((option, i) => {
              return (
                <Option value={option.id} key={i}>
                  {option.title}
                </Option>
              )
            })}{' '}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
