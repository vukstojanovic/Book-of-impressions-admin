import { Table, Tag, Space, Typography, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { data } from '../mockupData/users'

import { FormModal } from './FormModal'

const { Title } = Typography

export const Users = () => {
  const { t } = useTranslation('Users')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [fullName, setFullName] = useState('')
  const [form] = useForm()

  function openModal(userData) {
    setFullName(`${userData.name} ${userData.surname}`)
    form.setFieldsValue(userData)
    setIsModalVisible(true)
  }

  function closeModal() {
    setIsModalVisible(false)
  }

  function handleOk() {
    form.submit()
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('surname'),
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        return <Tag color="green">{role.toUpperCase()}</Tag>
      },
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_, record) => {
        return (
          <Space size="mg">
            <a style={{ marginRight: '5px' }} onClick={() => openModal(record)}>
              {t('edit')}
            </a>
            <a>{t('delete')}</a>
          </Space>
        )
      },
    },
  ]

  return (
    <>
      <Title level={4}>{t('users')}</Title>
      <Table dataSource={data} columns={columns} span={24} style={{ overflow: 'auto' }} />
      <Modal title={fullName} visible={isModalVisible} onOk={handleOk} onCancel={closeModal}>
        <FormModal form={form} />
      </Modal>
    </>
  )
}
