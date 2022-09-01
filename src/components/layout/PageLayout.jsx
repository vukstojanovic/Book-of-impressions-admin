import { useState } from 'react'
import { Layout } from 'antd'

import { SideMenu } from '../sidemenu'
import { HeaderComponent } from '../header'
import { BreadcrumbComponent } from '../breadcrumb'

import style from './PageLayout.module.css'
const { Content } = Layout

export const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className={`${collapsed ? style.collapsed : style.notCollapsed} ${style.transition}`}>
        <SideMenu collapsed={collapsed} />
        <Content className={style.layoutContent}>
          <BreadcrumbComponent />
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
