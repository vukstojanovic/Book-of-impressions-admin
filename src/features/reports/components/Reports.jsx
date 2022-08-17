import { Space, Table } from 'antd'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'

import { AddButton } from '@/components/buttons/AddButton'

export const Reports = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createBy',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'cretedAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="small">
          <EyeOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
          <DeleteOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
        </Space>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      name: 'Boi',
      createdBy: 'Danilo Markicevic',
      url: 'www.boi.com',
      createdAt: '12.05.2022',
    },
    {
      key: '2',
      name: 'Boi2',
      createdBy: 'Vuk Stojanovic',
      url: 'www.boi2.com',
      createdAt: '11.06.2021',
    },
    {
      key: '3',
      name: 'Boi3',
      createdBy: 'Stefan Meza',
      url: 'www.boi3.com',
      createdAt: '05.08.2022',
    },
    {
      key: '4',
      name: 'Travel App',
      createdBy: 'Vlada Stojanovic',
      url: 'www.travelApp.com',
      createdAt: '24.06.2021',
    },
    {
      key: '5',
      name: 'Benefit',
      createdBy: 'Nikola Markovic',
      url: 'www.benefit.com',
      createdAt: '10.11.2022',
    },
  ]

  return (
    <>
      <AddButton linkTo={'/reports/download-report'} />
      <Table columns={columns} dataSource={data} />
    </>
  )
}
