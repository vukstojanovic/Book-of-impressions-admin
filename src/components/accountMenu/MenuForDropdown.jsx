import { Menu, Avatar, Row, Col, Typography } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

export const MenuForDropdown = () => {
  const { t } = useTranslation('AccountMenu')

  return (
    <Menu style={{ padding: '0.5rem 1rem' }}>
      <Menu.Item
        key="personal info"
        style={{ background: 'white', cursor: 'default', padding: '0.5rem 0.2rem' }}
        onClick={(e) => e.preventDefault()}
      >
        <Row
          align="middle"
          justify="space-between"
          style={{
            minWidth: '16rem',
            cursor: 'arrow',
          }}
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
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="your profile"
        icon={<UserOutlined style={{ fontSize: '16px' }} />}
        style={{ padding: '0.5rem 0.2rem' }}
      >
        {t('your_profile')}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined style={{ fontSize: '16px' }} />}
        style={{ padding: '0.5rem 0.2rem' }}
      >
        {t('log_out')}
      </Menu.Item>
    </Menu>
  )
}
