import { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  LayoutFilled,
  FileTextOutlined,
  MinusOutlined,
  StarFilled,
  TeamOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { HeaderComponent } from '@/components/header'
const { Sider, Content, Footer } = Layout

export const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const { t } = useTranslation('General')

  return (
    <Layout>
      <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
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
          <h1>{t('header_title')}</h1>
          {children}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center', backgroundColor: '#b6b0b0' }}>Footer</Footer>
    </Layout>
  )
}
