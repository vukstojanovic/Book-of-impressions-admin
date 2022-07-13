import { Layout, Menu, Space, Typography } from 'antd'
import {
  LayoutOutlined,
  FileTextOutlined,
  FormOutlined,
  StarOutlined,
  TeamOutlined,
  QuestionCircleOutlined,
  CommentOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Footer } from 'antd/lib/layout/layout'

const { Sider } = Layout
const { Link } = Typography
export const SideMenu = ({ collapsed }) => {
  const navigate = useNavigate()

  const { t } = useTranslation('SideMenu')

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
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: 'dashboard',
            icon: <LayoutOutlined />,
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
            icon: <FormOutlined />,
            label: t('forms'),
            onClick: () => navigate('/forms'),
          },
          {
            key: 'reviews',
            icon: <StarOutlined />,
            label: t('reviews'),
            onClick: () => navigate('/reviews'),
          },
          {
            key: 'reports',
            icon: <FileTextOutlined />,
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
            icon: <TeamOutlined />,
            label: t('users'),
            onClick: () => navigate('/users'),
          },
        ]}
      />
      <Footer
        style={{
          padding: `${collapsed ? '0' : '7px 0 7px 20px'}`,
          display: 'grid',
          width: '100%',
          justifyItems: `${collapsed ? 'center' : 'start'}`,
          position: 'absolute',
          bottom: 70,
          backgroundColor: 'inherit',
        }}
      >
        <Space direction="vertical">
          <Link
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <QuestionCircleOutlined />
            {!collapsed && 'Get Support'}
          </Link>
          <Link
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <CommentOutlined />
            {!collapsed && 'Give Feedback'}
          </Link>
        </Space>
      </Footer>
    </Sider>
  )
}
