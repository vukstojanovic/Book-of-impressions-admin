import { Table, Tag, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

const { Title } = Typography

export const Users = () => {
  const { t } = useTranslation('Users')

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
      render: () => {
        return (
          <Space size="mg">
            <a style={{ marginRight: '5px' }}>{t('edit')}</a>
            <a>{t('delete')}</a>
          </Space>
        )
      },
    },
  ]

  const data = [
    {
      key: '1',
      id: '1',
      name: 'Vuk',
      surname: 'Stojanovic',
      email: 'vuks838@gmail.com',
      role: 'Frontend developer',
    },
    {
      key: '2',
      id: '2',
      name: 'Danilo',
      surname: 'Markicevic',
      email: 'danilo94@gmail.com',
      role: 'QA',
    },
    {
      key: '3',
      id: '3',
      name: 'Stefan',
      surname: 'Meza',
      email: 'meza94@gmail.com',
      role: 'Backend developer',
    },
    {
      key: '4',
      id: '4',
      name: 'Stefan',
      surname: 'Bozic',
      email: 'bozicstefan@gmail.com',
      role: 'Backend developer',
    },
  ]

  return (
    <>
      <Title level={4}>{t('users')}</Title>
      <Table dataSource={data} columns={columns} />
    </>
  )
}
