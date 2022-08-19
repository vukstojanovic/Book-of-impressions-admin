import { EditOutlined } from '@ant-design/icons'
import { Button, Row } from 'antd'
import { Link } from 'react-router-dom'

export const EditButton = ({ linkTo }) => (
  <Row align="middle" justify="end" style={{ marginBottom: '1.75rem' }}>
    <Link to={linkTo}>
      <Button icon={<EditOutlined />} type="primary" shape="circle" size="large" />
    </Link>
  </Row>
)
