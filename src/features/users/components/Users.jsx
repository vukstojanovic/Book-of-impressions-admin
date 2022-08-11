import { Table, Tag, Space, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { data } from '../mockupData/users'

import { FormModal } from './FormModal'

import { getColumnSearchProps } from '@/utils/columnSearchFilter'
import { AddButton } from '@/components/buttons/AddButton'
import { useAuth } from '@/providers/authProvider'

export const Users = () => {
  const { t } = useTranslation('Users')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [fullName, setFullName] = useState('')
  const [form] = useForm()

  const {
    user: { role },
  } = useAuth()

  const searchInput = useRef(null)
  const roles = []
  data.forEach(({ role }) => {
    if (!roles.includes(role)) {
      roles.push(role)
    }
  })

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
      ...getColumnSearchProps('name', searchInput),
    },
    {
      title: t('surname'),
      dataIndex: 'surname',
      key: 'surname',
      ...getColumnSearchProps('surname', searchInput),
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email', searchInput),
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      filters: roles.map((role) => {
        return { text: <span>{role}</span>, value: role }
      }),
      onFilter: (value, record) => record.role.startsWith(value),
      filterSearch: true,
      width: '40%',
      render: (role) => {
        return <Tag color="green">{role.toUpperCase()}</Tag>
      },
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_, record) => {
        if (role !== 'Manager') {
          return
        }
        return (
          <Space size="md">
            <a style={{ marginRight: '10px' }} onClick={() => openModal(record)}>
              <EditOutlined style={{ fontSize: '17px' }} />
            </a>
            <a>
              <DeleteOutlined style={{ fontSize: '17px' }} />
            </a>
          </Space>
        )
      },
    },
  ]

  return (
    <>
      <AddButton linkTo={'/users/invite-user'} />
      <Table dataSource={data} columns={columns} span={24} style={{ overflow: 'auto' }} />
      <Modal title={fullName} visible={isModalVisible} onOk={handleOk} onCancel={closeModal}>
        <FormModal form={form} />
      </Modal>
    </>
  )
}
