import { useEffect } from 'react'
import { DatePicker, Input, Modal, Form, Select, Col } from 'antd'

import { useCreateNewReport } from '../api/createNewReport.js'

import { useSelectDate } from '@/hooks/useSelectDate'
import { SelectDateRange } from '@/components/buttons'
import { SpinnerWithBackdrop } from '@/components/spinners'
export const CreateReportModal = ({
  t,
  isCreateReportModalOpen,
  handleCloseCreateReportModal,
  forms,
}) => {
  const [form] = Form.useForm()

  const [selectDateRange, state] = useSelectDate()

  const { mutate: createReport, isLoading: mutateIsLoading } = useCreateNewReport({ t })

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

  if (mutateIsLoading) {
    return <SpinnerWithBackdrop />
  }

  return (
    <Modal
      as="form"
      visible={isCreateReportModalOpen}
      okText={t('generate')}
      cancelText={t('cancel')}
      centered
      title={t('create_new_report')}
      onCancel={handleCloseCreateReportModal}
      okButtonProps={{ htmlType: 'submit', form: 'report-form', disabled: forms[0] === 0 }}
    >
      <Form
        onFieldsChange={onFieldsChange}
        form={form}
        onFinish={handleSubmitReports}
        layout="vertical"
        name="report-form"
        disabled={forms[1] === 0}
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
