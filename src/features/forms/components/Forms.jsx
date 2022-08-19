import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography, Row, Col, Card, Progress, Skeleton, Empty } from 'antd'
import { QrcodeOutlined } from '@ant-design/icons'

import { useForms } from '../api/getForms'

import QRCodeFormModal from './QRCodeFormModal'

import { AddButton } from '@/components/buttons/AddButton'
import { FilterComponent } from '@/components/filterComponent'
import { useFilterBySearchParams } from '@/utils/useFilterBySearchParams'

const { Title, Paragraph, Text } = Typography

export const Forms = () => {
  const { data, isLoading } = useForms()
  const { t } = useTranslation('Forms')

  const navigate = useNavigate()
  const [formTitle, setFormTitle] = useState('')
  const [formId, setFormId] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const divFlex = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
  const filteredData = useFilterBySearchParams(isLoading ? [] : data[0], 'title')

  const columnDivFlex = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  if (!isLoading && data[0].length === 0) {
    return (
      <>
        <AddButton linkTo="/forms/create-new-form" />
        <Empty
          description={
            <span>
              <b>{t('no_forms')}</b>
            </span>
          }
        />
      </>
    )
  }

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <FilterComponent />
        </Col>
        <Col>
          <AddButton linkTo="/forms/create-new-form" />
        </Col>
      </Row>

      <QRCodeFormModal
        formTitle={formTitle}
        formId={formId}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

      <Row align="middle" style={{ gap: 50 }}>
        {!isLoading ? (
          filteredData.map((form) => {
            const { id, name, title } = form
            return (
              <Card
                hoverable
                key={id}
                onClick={() => navigate(`/forms/${title}?id=${id}`)}
                style={{ width: 335, borderRadius: '20px' }}
              >
                <div style={divFlex}>
                  <Title level={5}>{title}</Title>
                  <QrcodeOutlined
                    onClick={(e) => {
                      setFormId(id)
                      setFormTitle(title)
                      setModalVisible(true)
                      e.stopPropagation()
                    }}
                  />
                </div>
                {/* Form Description */}
                <Paragraph>{name}</Paragraph>
                <div style={divFlex}>
                  <div style={columnDivFlex}>
                    <Progress
                      type="circle"
                      width={75}
                      percent={50}
                      style={{ marginBottom: '0.75rem' }}
                    />
                    <Text strong>150/300</Text>
                  </div>
                  <div style={columnDivFlex}>
                    <Progress
                      type="circle"
                      width={75}
                      percent={70}
                      style={{ marginBottom: '0.75rem' }}
                    />
                    <Text strong>250/300</Text>
                  </div>
                  <div style={columnDivFlex}>
                    <Progress
                      type="circle"
                      width={75}
                      percent={30}
                      style={{ marginBottom: '0.75rem' }}
                    />
                    <Text strong>30/300</Text>
                  </div>
                </div>
              </Card>
            )
          })
        ) : (
          <>
            <Card style={{ width: 335, borderRadius: '20px' }}>
              <Skeleton />
            </Card>
            <Card style={{ width: 335, borderRadius: '20px' }}>
              <Skeleton />
            </Card>
            <Card style={{ width: 335, borderRadius: '20px' }}>
              <Skeleton />
            </Card>
            <Card style={{ width: 335, borderRadius: '20px' }}>
              <Skeleton />
            </Card>
            <Card style={{ width: 335, borderRadius: '20px' }}>
              <Skeleton />
            </Card>
            <Card style={{ width: 335, borderRadius: '20px' }}>
              <Skeleton />
            </Card>
          </>
        )}
      </Row>
    </>
  )
}
