import { useRef } from 'react'
import { Space, Table } from 'antd'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { AddButton } from '@/components/buttons/AddButton'
import { getColumnSearchProps } from '@/utils/columnSearchFilter'

export const Reports = () => {
  const { t } = useTranslation('Reports')

  const searchInput = useRef(null)

  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name', searchInput),
    },
    {
      title: t('created_by'),
      dataIndex: 'createdBy',
      key: 'createBy',
      ...getColumnSearchProps('createdBy', searchInput),
    },
    {
      title: t('url'),
      dataIndex: 'url',
      key: 'url',
      ...getColumnSearchProps('url', searchInput),
    },
    {
      title: t('created_at'),
      dataIndex: 'createdAt',
      key: 'cretedAt',
      ...getColumnSearchProps('createdAt', searchInput),
    },
    {
      title: t('action'),
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
