import { Form, Input, Select } from 'antd'
import { useTranslation } from 'react-i18next'

import { useEditUser } from '../api/editUser.js'

export const FormModal = ({ closeEditModal, form, refetch, userId }) => {
  const { t } = useTranslation('Users')
  const roles = ['Manager', 'Viewer']

  const { mutate: editUser } = useEditUser({ refetch, closeEditModal })

  function submitData(values) {
    editUser({ data: values, id: userId })
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
