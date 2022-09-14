import { Button, Row, Col, Table, Tag, Space, Modal, Typography, Skeleton, Empty } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { useGetUsers } from '../api/getUsers.js'
import { useDeleteUser } from '../api/deleteUser.js'

import { FormModal } from './FormModal'

import { getColumnSearchProps } from '@/utils/columnSearchFilter'
import { AddButton } from '@/components/buttons/AddButton'
import { SpinnerWithBackdrop } from '@/components/spinners'
import { useAuth } from '@/providers/authProvider'

export const Users = () => {
  const { t } = useTranslation('Users')

  const { Paragraph } = Typography

  const { data: users, refetch, isLoading, isFetching, isFetchedAfterMount } = useGetUsers()
  const { mutate: deleteUser, isLoading: deleteMutationIsLoading } = useDeleteUser({
    refetchUsers: refetch,
    closeDeleteModal,
  })

  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [form] = useForm()

  const roles = ['Manager', 'Viewer']
  const {
    user: { role },
  } = useAuth()

  const searchInput = useRef(null)

  function openEditModal(userData) {
    setUserId(userData.id)
    setName(`${userData.name}`)
    form.setFieldsValue(userData)
    setIsEditModalVisible(true)
  }

  function closeEditModal() {
    setIsEditModalVisible(false)
  }

  function openDeleteModal(userData) {
    setUserId(userData.id)
    setName(userData.name)
    setIsDeleteModalVisible(true)
  }

  function closeDeleteModal() {
    setIsDeleteModalVisible(false)
  }

  function handleEditUser() {
    form.submit()
  }

  function handleDeleteUser() {
    deleteUser({ id: userId })
  }

  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name', searchInput),
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email', searchInput),
      render: (email) => {
        return <a href={`mailto:${email}`}>{email}</a>
      },
    },
    {
      title: t('role'),
      dataIndex: 'role',
      key: 'role',
      filters: roles.map((role) => {
        return { text: <span>{role}</span>, value: role }
      }),
      onFilter: (value, record) => record.role.startsWith(value),
      render: (role) => {
        return <Tag color="green">{role.toUpperCase()}</Tag>
      },
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_, record) => {
        if (role !== 'Manager') return
        return (
          <Space size={[20]}>
            <Button onClick={() => openEditModal(record)}>
              <EditOutlined style={{ fontSize: '17px', verticalAlign: 'middle' }} />
            </Button>
            <Button onClick={() => openDeleteModal(record)}>
              <DeleteOutlined style={{ fontSize: '17px', verticalAlign: 'middle' }} />
            </Button>
          </Space>
        )
      },
    },
  ]

  if (isLoading) {
    return (
      <>
        <Row justify="end" style={{ marginBottom: '20px' }}>
          <Col>
            <Skeleton.Button shape="circle" />
          </Col>
        </Row>
        <Row>
          <Skeleton />
        </Row>
      </>
    )
  }

  if (users[1] === 0) {
    return (
      <>
        {role === 'Manager' && <AddButton linkTo={'/users/invite-user'} />}
        <Empty
          description={
            <span>
              <b>{t('no_users')}</b>
            </span>
          }
        />
      </>
    )
  }

  return (
    <>
      {role === 'Manager' && <AddButton linkTo={'/users/invite-user'} />}
      <Table
        dataSource={users[0]}
        columns={columns}
        span={24}
        style={{ overflow: 'auto' }}
        locale={{
          emptyText: (
            <Empty
              description={
                <span>
                  <b>{t('no_results')}</b>
                </span>
              }
            />
          ),
        }}
        rowKey={'id'}
      />
      {(isFetching && isFetchedAfterMount) || deleteMutationIsLoading ? (
        <SpinnerWithBackdrop />
      ) : (
        <Modal
          centered
          title={`${name}`}
          visible={isEditModalVisible}
          onOk={handleEditUser}
          onCancel={closeEditModal}
          okText={t('edit')}
          cancelText={t('cancel')}
        >
          <FormModal
            form={form}
            refetch={refetch}
            userId={userId}
            closeEditModal={closeEditModal}
          />
        </Modal>
      )}
      {(isFetching && isFetchedAfterMount) || deleteMutationIsLoading ? (
        <SpinnerWithBackdrop />
      ) : (
        <Modal
          centered
          visible={isDeleteModalVisible}
          onOk={handleDeleteUser}
          onCancel={closeDeleteModal}
          closable={false}
          bodyStyle={{ textAlign: 'center' }}
          cancelText={t('cancel')}
          okText={t('delete')}
        >
          <Paragraph>{`${t('confirm_delete')}:`} </Paragraph>
          <Paragraph strong>{`${name} ?`}</Paragraph>
        </Modal>
      )}
    </>
  )
}
