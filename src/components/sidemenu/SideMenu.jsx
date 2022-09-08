import { Layout, Menu, Typography } from 'antd'
import {
  LayoutOutlined,
  FileTextOutlined,
  FormOutlined,
  StarOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  CommentOutlined,
  SettingOutlined,
  GoogleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Footer } from 'antd/lib/layout/layout'
import { useEffect, useState } from 'react'

const { Sider } = Layout
const { Link } = Typography
export const SideMenu = ({ collapsed }) => {
  const navigate = useNavigate()

  const [selectedKey, setSelectedKey] = useState('')

  const location = useLocation()
  const { t } = useTranslation('SideMenu')

  useEffect(() => {
    setSelectedKey(location.pathname.split('/')[1] || '/')
  }, [location.pathname])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        margin: '64px 0 0 0',
        paddingTop: '2rem',
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{
          color: 'white',
          fontWeight: 600,
        }}
        items={[
          {
            key: '/',
            icon: <LayoutOutlined style={{ fontSize: '18px' }} />,
            label: t('dashboard'),
            onClick: () => navigate('/'),
          },
          {
            key: 'main',
            label: collapsed ? '' : t('main'),
            type: collapsed ? 'divider' : 'group',
            style: { width: collapsed && '50%', margin: collapsed && '1.5rem auto' },
          },
          {
            key: 'forms',
            icon: <FormOutlined style={{ fontSize: '18px' }} />,
            label: t('forms'),
            onClick: () => navigate('/forms'),
          },
          {
            key: 'reviews',
            icon: <StarOutlined style={{ fontSize: '18px' }} />,
            label: t('reviews'),
            onClick: () => navigate('/reviews'),
          },
          {
            key: 'google-reviews',
            icon: <GoogleOutlined style={{ fontSize: '18px' }} />,
            label: t('google_reviews'),
            onClick: () => navigate('/google-reviews'),
          },
          {
            key: 'tripadvisor-reviews',
            icon: <EnvironmentOutlined style={{ fontSize: '18px' }} />,
            label: t('tripadvisor_reviews'),
            onClick: () => navigate('/tripadvisor-reviews'),
          },
          {
            key: 'reports',
            icon: <FileTextOutlined style={{ fontSize: '18px' }} />,
            label: t('reports'),
            onClick: () => navigate('/reports'),
          },
          {
            key: 'organization',
            label: collapsed ? '' : t('organization'),
            type: collapsed ? 'divider' : 'group',
            style: { width: collapsed && '50%', margin: collapsed && '1.5rem auto' },
          },
          {
            key: 'users',
            icon: <TeamOutlined style={{ fontSize: '18px' }} />,
            label: t('users'),
            onClick: () => navigate('/users'),
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: t('settings'),
            onClick: () => navigate('/settings'),
          },
        ]}
      />
      <Footer
        style={{
          padding: `${collapsed ? '0' : '7px 0 7px 20px'}`,
          display: 'grid',
          gap: 8,
          width: '100%',
          justifyItems: `${collapsed ? 'center' : 'start'}`,
          position: 'absolute',
          bottom: 70,
          backgroundColor: 'inherit',
        }}
      >
        <Link
          href="mailto:support@boi.rs"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'white',
          }}
        >
          <QuestionCircleOutlined style={{ fontSize: '18px' }} />
          {!collapsed ? t('getSupport') : ''}
        </Link>
        <Link
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'white',
          }}
        >
          <CommentOutlined style={{ fontSize: '18px' }} />
          {!collapsed ? t('leaveComment') : ''}
        </Link>
      </Footer>
    </Sider>
  )
}
