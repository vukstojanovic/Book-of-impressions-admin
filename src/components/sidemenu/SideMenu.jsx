import { Layout, Menu } from 'antd'
const { Sider } = Layout
import {
  LayoutOutlined,
  FileTextOutlined,
  FormOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const SideMenu = ({ collapsed }) => {
  const navigate = useNavigate()

  const { t } = useTranslation('SideMenu')

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <LayoutOutlined />,
            label: t('dashboard'),
            onClick: () => navigate('/'),
          },
          {
            key: '2',
            label: collapsed ? '' : t('main'),
            type: collapsed ? 'divider' : 'group',
            style: { width: collapsed && '50%', margin: collapsed && '1.5rem auto' },
          },
          {
            key: '3',
            icon: <FormOutlined />,
            label: t('forms'),
            onClick: () => navigate('/forms'),
          },
          {
            key: '4',
            icon: <StarOutlined />,
            label: t('reviews'),
            onClick: () => navigate('/reviews'),
          },
          {
            key: '5',
            icon: <FileTextOutlined />,
            label: t('reports'),
            onClick: () => navigate('/reports'),
          },
          {
            key: '6',
            label: collapsed ? '' : t('organization'),
            type: collapsed ? 'divider' : 'group',
            style: { width: collapsed && '50%', margin: collapsed && '1.5rem auto' },
          },
          {
            key: '7',
            icon: <TeamOutlined />,
            label: t('users'),
            onClick: () => navigate('/users'),
          },
        ]}
      />
    </Sider>
  )
}
