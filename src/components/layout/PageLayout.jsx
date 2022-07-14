import { useState } from 'react'
import { Layout } from 'antd'

import { SideMenu } from '../sidemenu'
import { HeaderComponent } from '../header'
import { BreadcrumbComponent } from '../breadcrumb'

const { Content } = Layout

export const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout
        style={{
          margin: `${collapsed ? '64px 0 0 80px' : '64px 0 0 200px'}`,
          transitionDuration: '0.3s',
        }}
      >
        <SideMenu collapsed={collapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
          }}
        >
          <BreadcrumbComponent />
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
