import { Dropdown, Avatar } from 'antd'

import { MenuForDropdown } from '@/components/accountMenu'

export const AccountMenu = () => {
  return (
    <Dropdown
      overlay={<MenuForDropdown />}
      placement="bottomRight"
      trigger={['click']}
      arrow={{ pointAtCenter: true }}
    >
      <Avatar size={40} style={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}>
        BB
      </Avatar>
    </Dropdown>
  )
}
