import { Dropdown, Avatar } from 'antd'

import { MenuForDropdown } from '@/components/accountMenu'
import { useGetUserDataQuery } from '@/features/profileSettings/api/submitUserSettingForm'

export const AccountMenu = () => {
  const { data, isLoading, isError } = useGetUserDataQuery()

  if (isLoading || isError) {
    return (
      <Avatar
        size={40}
        style={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
      />
    )
  }

  return (
    <Dropdown
      overlay={
        <MenuForDropdown name={data.name} email={data.email} profilePhoto={data.profilePhoto} />
      }
      placement="bottomRight"
      trigger={['click']}
      arrow={{ pointAtCenter: true }}
    >
      <Avatar
        size={40}
        src={data.profilePhoto}
        style={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
      >
        {`${data.name[0]}${data.name.split(' ')[1][0]}`}
      </Avatar>
    </Dropdown>
  )
}
