import React from 'react'
import { Row, Col, Layout, Space, Select, Image } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, BellOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { AccountMenu } from '@/components/accountMenu'
import { Logo } from '@/components/Logo'
import storage from '@/utils/storage'

const { Header } = Layout
const { Option } = Select

export const HeaderComponent = ({ collapsed, setCollapsed }) => {
  const { i18n } = useTranslation()

  const handleChange = (value) => {
    i18n.changeLanguage(value)
    storage.set('lng', value)
  }

  return (
    <Header style={{ position: 'fixed', zIndex: 10, width: '100%' }}>
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
                <Logo />
              </div>
            </div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'sidemenu-trigger-button',
              style: {
                padding: '0 24px',
                paddingTop: '3px',
                fontSize: '24px',
                lineHeight: '64px',
                cursor: 'pointer',
                color: 'white',
                transition: 'color 0.3s',
              },
              onClick: () => setCollapsed(!collapsed),
            })}
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
            <div style={{ color: 'white', display: 'flex' }}>
              <BellOutlined style={{ fontSize: '1.5rem' }} />
            </div>
            <div style={{ color: 'white', cursor: 'pointer' }}>
              <AccountMenu />
            </div>
          </Space>
        </Col>
      </Row>
    </Header>
  )
}
