import React, { useState } from 'react'
import { Col, Layout, Menu, Row } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LayoutFilled,
  FileTextOutlined,
  MinusOutlined,
  StarFilled,
  TeamOutlined,
} from '@ant-design/icons'
// import { useTranslation } from 'react-i18next'

const { Header, Sider, Content, Footer } = Layout

export const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  // const { t } = useTranslation('General')

  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          display: 'flex',
        }}
      >
        <div
          style={{
            width: '100px',
            height: '32px',
            margin: '16px',
            background: 'rgba(255, 255, 255, 0.3)',
          }}
        />
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          style: {
            padding: '0 24px',
            fontSize: '18px',
            lineHeight: '64px',
            cursor: 'pointer',
            color: 'white',
            transition: 'color 0.3s',
          },
          onClick: () => setCollapsed(!collapsed),
        })}
        <Row
          justify="end"
          style={{
            flex: 1,
            color: 'white',
            gap: 4,
            marginRight: '10px',
          }}
        >
          <Col>
            <p>Flag</p>
          </Col>
          <Col>
            <p>Notification</p>
          </Col>
          <Col>
            <p>Avatar</p>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <LayoutFilled />,
                label: 'Dashboard',
              },
              {
                key: '2',
                icon: collapsed ? <MinusOutlined /> : null,
                label: collapsed ? '' : 'Main',
              },
              {
                key: '3',
                icon: <FileTextOutlined />,
                label: 'Forms',
              },
              {
                key: '4',
                icon: <StarFilled />,
                label: 'Reviews',
              },
              {
                key: '5',
                icon: <FileTextOutlined />,
                label: 'Reports',
              },
              {
                key: '6',
                icon: collapsed ? <MinusOutlined /> : null,
                label: collapsed ? '' : 'Organization',
              },
              {
                key: '7',
                icon: <TeamOutlined />,
                label: 'Users',
              },
            ]}
          />
        </Sider>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
          }}
        >
          {/* <h1>{t('header_title')}</h1> */}
          {children}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center', backgroundColor: '#b6b0b0' }}>Footer</Footer>
    </Layout>
  )
}
