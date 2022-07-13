import { Layout, Menu, Typography } from 'antd'
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
const { Text } = Typography
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
          padding: '7px 0 7px 5px',
          display: 'grid',
          width: `100%`,
          justifyItems: `${collapsed ? 'center' : 'start'}`,
        }}
      >
        <Text
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 0 6px 0',
            transitionDuration: '0.3s',
          }}
        >
          <QuestionCircleOutlined style={{ padding: '0 5px 0 0' }} />
          {<p style={{ margin: '0', opacity: `${collapsed ? '' : ''}` }}>Need help ?</p>}
        </Text>
        <CommentOutlined />
      </Footer>
    </Sider>
  )
}
