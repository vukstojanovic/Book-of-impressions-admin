import { Form, Input, Select } from 'antd'
import { useTranslation } from 'react-i18next'

export const FormModal = ({ form }) => {
  const { t } = useTranslation('Users')
  const roles = ['Frontend developer', 'Backend developer', 'QA']

  function submitData(values) {
    console.log(values)
  }

  return (
    <Form
      onFinish={submitData}
      size="large"
      layout="vertical"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      requiredMark={false}
      form={form}
    >
      <Form.Item
        label={t('name')}
        name="name"
        rules={[
          {
            required: true,
            message: t('empty_warning'),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t('surname')}
        name="surname"
        rules={[
          {
            required: true,
            message: t('empty_warning'),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t('email')}
        name="email"
        rules={[
          {
            required: true,
            message: t('empty_warning'),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={t('role')} name="role">
        <Select>
          {roles.map((role) => {
            return (
              <Select.Option key={role} value={role}>
                {role}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}
