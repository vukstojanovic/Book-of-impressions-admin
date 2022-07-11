import React from 'react'
import { Row, Col, Typography, Layout, Space, Select, Avatar } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, BellOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const { Title } = Typography
const { Header } = Layout
const { Option } = Select

export const HeaderComponent = ({ collapsed, setCollapsed }) => {
  const { i18n } = useTranslation()

  const handleChange = (value) => {
    i18n.changeLanguage(value)
  }

  return (
    <Header>
      <Row align="middle" justify="space-between">
        <Col>
          <Space>
            <Title level={2} style={{ color: 'white', marginBottom: '0' }}>
              LOGO
            </Title>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              style: {
                padding: '0 24px',
                paddingTop: '3px',
                fontSize: '18px',
                lineHeight: '64px',
                cursor: 'pointer',
                color: 'white',
                transition: 'color 0.3s',
              },
              onClick: () => setCollapsed(!collapsed),
            })}
          </Space>
        </Col>
        <Col>
          <Space size={16}>
            <div>
              <Select defaultValue="sr" onChange={handleChange}>
                <Option value="sr">SR</Option>
                <Option value="en">EN</Option>
              </Select>
            </div>
            <div style={{ color: 'white' }}>
              <BellOutlined style={{ fontSize: '1.5rem' }} />
            </div>
            <div style={{ color: 'white' }}>
              <Avatar size={30}>USER</Avatar>
            </div>
          </Space>
        </Col>
      </Row>
    </Header>
  )
}
