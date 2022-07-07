import { Table, Tag, Space, Typography } from 'antd'
const { Title } = Typography

export const Users = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        return <Tag color="green">{role.toUpperCase()}</Tag>
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => {
        return (
          <Space size="mg">
            <a style={{ marginRight: '5px' }}>Edit</a>
            <a>Delete</a>
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
      <Title level={3}>Home/Users</Title>
      <Title level={4}>Users</Title>
      <Table dataSource={data} columns={columns} />
    </>
  )
}
