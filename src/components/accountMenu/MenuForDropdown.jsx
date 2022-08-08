import { Menu, Avatar, Row, Col, Typography } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

// import { handleLogout } from '@/features/auth/api/logout'
// import storage from '@/utils/storage'
import { useAuth } from '@/providers/authProvider'

export const MenuForDropdown = () => {
  const { t } = useTranslation('AccountMenu')

  const { logout } = useAuth()

  const navigate = useNavigate()

  // const logoutHandler = async () => {
  //   await handleLogout()

  //   storage.clear('access_token')
  //   storage.clear('refresh_token')

  //   navigate('/sign-in')
  // }

  const items = [
    {
      label: (
        <Row
          align="middle"
          justify="space-between"
          style={{
            minWidth: '16rem',
            padding: '0.5rem 0.2rem',
            cursor: 'default',
            width: '100%',
            background: 'white',
          }}
          onClick={(e) => e.preventDefault()}
        >
          <Col>
            <Avatar
              style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGx-KKukqAdVSXQkxFvQXMyBkPI9IHzadAoA&usqp=CAU"
              size={40}
            >
              BB
            </Avatar>
          </Col>
          <Col style={{ paddingLeft: '1rem' }}>
            <Typography.Paragraph style={{ margin: 0, wordBreak: 'break-word' }}>
              <b>Bezimenko Bezprezimenkovic</b>
            </Typography.Paragraph>
            <Typography.Paragraph style={{ margin: 0, wordBreak: 'break-word' }}>
              bezimenko992@gmail.com
            </Typography.Paragraph>
          </Col>
        </Row>
      ),
      key: 'general-info',
    },
    {
      label: (
        <div
          style={{
            padding: '0.4rem 0.2rem',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => navigate('/my-profile')}
        >
          <UserOutlined style={{ fontSize: '16px', marginRight: '7px' }} />
          {t('your_profile')}
        </div>
      ),
      key: 'your profile',
    },
    {
      label: (
        <div
          style={{
            padding: '0.4rem 0.2rem',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={logout}
        >
          <LogoutOutlined style={{ fontSize: '16px', marginRight: '7px' }} /> {t('log_out')}
        </div>
      ),
      key: 'log out',
    },
  ]

  return <Menu items={items} />
}
