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
      <Layout
        className={`${collapsed ? style.collapsed : style.notCollapsed} style.transition`}
        /* style={{ */
        /*   margin: `${collapsed ? '64px 0 0 80px' : '64px 0 0 200px'}`, */
        /*   transitionDuration: '0.3s', */
        /* }} */
      >
        <SideMenu collapsed={collapsed} />
        <Content className={style.layoutContent}>
          <BreadcrumbComponent />
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
