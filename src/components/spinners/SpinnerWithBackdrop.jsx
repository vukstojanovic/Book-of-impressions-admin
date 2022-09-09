import { Col, Spin } from 'antd'
export const SpinnerWithBackdrop = () => {
  return (
    <Col
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'grid',
        justifyItems: 'center',
        zIndex: '5',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        width: '100%',
        minHeight: '100%',
      }}
    >
      <Spin size="large" />
    </Col>
  )
}
