import { Layout, Menu } from 'antd'
const { Sider } = Layout
import {
  LayoutFilled,
  FileTextOutlined,
  FormOutlined,
  StarFilled,
  TeamOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const SideMenu = ({ collapsed }) => {
  const navigate = useNavigate()
  return (
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
            onClick: () => navigate('/'),
          },
          {
            key: '2',
            label: collapsed ? '' : 'Main',
            type: collapsed ? 'divider' : 'group',
            style: { width: collapsed && '50%', margin: collapsed && '1.5rem auto' },
          },
          {
            key: '3',
            icon: <FormOutlined />,
            label: 'Forms',
            onClick: () => navigate('/forms'),
          },
          {
            key: '4',
            icon: <StarFilled />,
            label: 'Reviews',
            onClick: () => navigate('/reviews'),
          },
          {
            key: '5',
            icon: <FileTextOutlined />,
            label: 'Reports',
            onClick: () => navigate('/reports'),
          },
          {
            key: '6',
            label: collapsed ? '' : 'Organization',
            type: collapsed ? 'divider' : 'group',
            style: { width: collapsed && '50%', margin: collapsed && '1.5rem auto' },
          },
          {
            key: '7',
            icon: <TeamOutlined />,
            label: 'Users',
            onClick: () => navigate('/users'),
          },
        ]}
      />
    </Sider>
  )
}
