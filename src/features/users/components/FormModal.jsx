import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

export function FormModal({ form }) {
  const { t } = useTranslation('Users')

  function submitData(values) {
    console.log(values)
  }

  return (
    <Form onFinish={submitData} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form}>
      <Form.Item
        label={t('name')}
        name="name"
        rules={[
          {
            required: true,
            message: 'Cannot be empty!',
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
            message: 'Cannot be empty!',
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
            message: 'Cannot be empty!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t('role')}
        name="role"
        rules={[
          {
            required: true,
            message: 'Cannot be empty!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}
