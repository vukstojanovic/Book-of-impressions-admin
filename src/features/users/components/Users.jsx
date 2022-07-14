import { Table, Tag, Space, Typography, Modal, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { data } from '../mockupData/users'

import { FormModal } from './FormModal'

import { getColumnSearchProps } from '@/utils/columnSearchFilter'

export const Users = () => {
  const { t } = useTranslation('Users')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [fullName, setFullName] = useState('')
  const [form] = useForm()
  const searchInput = useRef(null)

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
      <Row justify="space-between" align="middle" style={{ marginBottom: '15px' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {t('users')}
        </Typography.Title>
        <Link to="/users/invite-user">
          <PlusCircleOutlined style={{ fontSize: '40px', color: 'black' }} />
        </Link>
      </Row>
      <Table dataSource={data} columns={columns} span={24} style={{ overflow: 'auto' }} />
      <Modal title={fullName} visible={isModalVisible} onOk={handleOk} onCancel={closeModal}>
        <FormModal form={form} />
      </Modal>
    </>
  )
}
