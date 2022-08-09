import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Row } from 'antd'
import { Link } from 'react-router-dom'

export const AddButton = ({ linkTo }) => (
  <Row align="middle" justify="end" style={{ marginBottom: '1.75rem' }}>
    <Link to={linkTo}>
      <Button icon={<PlusCircleOutlined />} type="primary" shape="circle" size="large" />
    </Link>
  </Row>
)
