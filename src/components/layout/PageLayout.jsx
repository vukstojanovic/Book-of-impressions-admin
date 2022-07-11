import { useState } from 'react'
import { Layout } from 'antd'

import { SideMenu } from '../sidemenu'
import { HeaderComponent } from '../header'
import { BreadcrumbComponent } from '../breadcrumb'

const { Content, Footer } = Layout

export const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <SideMenu collapsed={collapsed} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
          }}
        >
          {/* <h1>{t('header_title')}</h1> */}
          <BreadcrumbComponent />
          {children}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center', backgroundColor: '#b6b0b0' }}>Footer</Footer>
    </Layout>
  )
}
