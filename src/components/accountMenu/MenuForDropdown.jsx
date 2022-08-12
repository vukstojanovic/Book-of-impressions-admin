import { Menu, Avatar, Row, Col, Typography } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/providers/authProvider'

export const MenuForDropdown = ({ name, email, profilePhoto }) => {
  const { t } = useTranslation('AccountMenu')

  const { logout } = useAuth()

  const navigate = useNavigate()

  const items = [
    {
      label: (
        <Row
          align="middle"
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
              src={profilePhoto}
              size={40}
            >
              {name.split(' ').length > 1 ? `${name[0]}${name.split(' ')[1][0]}` : `${name[0]}`}
            </Avatar>
          </Col>
          <Col style={{ paddingLeft: '1rem' }}>
            <Typography.Paragraph style={{ margin: 0, wordBreak: 'break-word' }}>
              <b>{name}</b>
            </Typography.Paragraph>
            <Typography.Paragraph style={{ margin: 0, wordBreak: 'break-word' }}>
              {email}
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
