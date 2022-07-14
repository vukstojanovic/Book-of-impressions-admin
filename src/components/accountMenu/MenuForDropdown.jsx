import { Menu, Avatar, Row, Col, Typography } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'

export const MenuForDropdown = () => {
  return (
    <Menu style={{ padding: '0.5rem' }}>
      <Menu.Item
        key="personal info"
        style={{ background: 'white', cursor: 'default', padding: '0.5rem 0.2rem' }}
        onClick={(e) => e.preventDefault()}
      >
        <Row
          align="middle"
          justify="space-between"
          style={{ minWidth: '16rem', maxWidth: '26rem', cursor: 'arrow', zIndex: 15 }}
        >
          <Col span={4}>
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGx-KKukqAdVSXQkxFvQXMyBkPI9IHzadAoA&usqp=CAU"
              size={40}
            />
          </Col>
          <Col span={20} style={{ paddingLeft: '0.5rem' }}>
            <Typography.Paragraph style={{ margin: 0, wordBreak: 'break-word' }}>
              <b>Bezimenko Bezprezimenkovic</b>
            </Typography.Paragraph>
            <Typography.Paragraph style={{ margin: 0, wordBreak: 'break-word' }}>
              bezimenko992@gmail.com
            </Typography.Paragraph>
          </Col>
        </Row>
      </Menu.Item>
      <Menu.Item key="your profile" icon={<UserOutlined />} style={{ padding: '0.5rem 0.2rem' }}>
        Your profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ padding: '0.5rem 0.2rem' }}>
        Log out
      </Menu.Item>
    </Menu>
  )
}
