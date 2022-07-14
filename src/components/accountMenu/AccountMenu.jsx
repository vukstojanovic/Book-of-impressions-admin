import { Menu, Dropdown, Avatar, Row, Col, Typography } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'

export const AccountMenu = () => {
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Row
              align="middle"
              justify="space-between"
              style={{ minWidth: '15rem', maxWidth: '20rem', cursor: 'arrow' }}
            >
              <Col span={4}>
                <Avatar
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGx-KKukqAdVSXQkxFvQXMyBkPI9IHzadAoA&usqp=CAU"
                  size={40}
                />
              </Col>
              <Col span={20} style={{ paddingLeft: '0.5rem' }}>
                <Typography.Paragraph style={{ margin: 0, wordBreak: 'break-word' }}>
                  Bezimenko Bezprezimenkovic
                </Typography.Paragraph>
                <Typography.Paragraph style={{ margin: 0, wordBreak: 'break-word' }}>
                  bezimenko992@gmail.com
                </Typography.Paragraph>
              </Col>
            </Row>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Your profile
            </a>
          ),
          icon: <UserOutlined />,
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Log out
            </a>
          ),
          icon: <LogoutOutlined />,
        },
      ]}
    />
  )
  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
      <Avatar size={40} style={{ cursor: 'pointer' }}>
        USER
      </Avatar>
    </Dropdown>
  )
}
