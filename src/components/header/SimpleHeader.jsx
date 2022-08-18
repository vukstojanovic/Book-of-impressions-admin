import { Row, Col, Layout, Space, Select, Image, Grid } from 'antd'
import { useTranslation } from 'react-i18next'

import { Logo } from '@/components/Logo'
import storage from '@/utils/storage'

const { Header } = Layout
const { Option } = Select
const { useBreakpoint } = Grid

export const SimpleHeaderComponent = () => {
  const { i18n } = useTranslation()
  const { md } = useBreakpoint()
  const handleChange = (value) => {
    i18n.changeLanguage(value)
    storage.set('lng', value)
  }

  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 3,
        width: '100%',
        backgroundColor: `${md ? 'transparent' : 'white'}`,
      }}
    >
      <Row justify="space-between">
        <Col>
          <Space>
            <div
              style={{
                position: 'relative',
                display: 'block',
                width: '5rem',
                height: '4rem',
                transform: 'translateY(0.125rem)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Logo variant="dark" />
              </div>
            </div>
          </Space>
        </Col>
        <Col>
          <Space size={16}>
            <div>
              <Select defaultValue={storage.get('lng') || 'en'} onChange={handleChange}>
                <Option key="sr" value="sr">
                  <Image src="/img/f-sr.svg" preview={false} width={'1.4rem'} />
                </Option>
                <Option key="en" value="en">
                  <Image src="/img/f-gb.svg" preview={false} width={'1.4rem'} />
                </Option>
              </Select>
            </div>
          </Space>
        </Col>
      </Row>
    </Header>
  )
}
