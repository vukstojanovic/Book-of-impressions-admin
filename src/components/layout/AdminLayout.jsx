import { Col, Row, Grid } from 'antd'

import { SimpleHeaderComponent } from '../header'

const { useBreakpoint } = Grid

export const AdminLayout = ({ children }) => {
  const { md, lg, xl } = useBreakpoint()
  return (
    <Row style={{ minHeight: '100vh' }}>
      <SimpleHeaderComponent />
      <Col
        span={24}
        md={12}
        style={{
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <img
          src="https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/login-bg.26a96a34.svg"
          alt="image"
          width={'100%'}
          style={{
            zIndex: 2,
            transform: `translate(${xl ? '5' : lg ? '3' : md ? '2' : '0'}rem)`,
          }}
        />
      </Col>
      <Col
        span={24}
        md={12}
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
