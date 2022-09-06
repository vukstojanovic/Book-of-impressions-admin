import { Form, Select } from 'antd'
import { useTranslation } from 'react-i18next'

export const SelectDateRange = () => {
  const { t: selectTexts } = useTranslation('Charts')
  const { Option } = Select

  return (
    <Form.Item label={selectTexts('label_date')} name="selectedDateRange">
      <Select style={{ minWidth: '200px' }}>
        <Option value="today">{selectTexts('today')}</Option>
        <Option value="last_day">{selectTexts('last_day')}</Option>
        <Option value="last_3_days">{selectTexts('last_3_days')}</Option>
        <Option value="last_week">{selectTexts('last_week')}</Option>
        <Option value="last_3_weeks">{selectTexts('last_3_weeks')}</Option>
        <Option value="last_month">{selectTexts('last_month')}</Option>
        <Option value="custom">{selectTexts('custom')}</Option>
      </Select>
    </Form.Item>
  )
}
