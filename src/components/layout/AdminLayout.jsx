import { Col, Row } from 'antd'

export const AdminLayout = ({ children }) => {
  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col
        span={12}
        style={{
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/login-bg.26a96a34.svg"
          alt="image"
          width={'100%'}
          style={{ zIndex: 2, transform: 'translate(5rem)' }}
        />
      </Col>
      <Col
        span={12}
        style={{
          backgroundColor: '#fafafa',
          display: 'grid',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        {children}
      </Col>
    </Row>
  )
}
