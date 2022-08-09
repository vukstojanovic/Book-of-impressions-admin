import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Row, Card, Progress, Skeleton, Empty } from 'antd'
import { QrcodeOutlined } from '@ant-design/icons'

import { useForms } from '../api/getForms'

import QRCodeFormModal from './QRCodeFormModal'

import { AddButton } from '@/components/buttons/AddButton'

const { Title, Paragraph, Text } = Typography

export const Forms = () => {
  const { data, isLoading } = useForms()
  const { t } = useTranslation('Forms')

  const [formTitle, setFormTitle] = useState('')
  const [formId, setFormId] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [qrValue, setQrValue] = useState('asd')
  const divFlex = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }

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
      <AddButton linkTo="/forms/create-new-form" />

      <QRCodeFormModal
        formTitle={formTitle}
        formId={formId}
        qrValue={qrValue}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

      <Row align="middle" style={{ gap: 50 }}>
        {!isLoading ? (
          data[0].map((form) => {
            const { id, name, title } = form
            return (
              <Skeleton key={id} loading={isLoading}>
                <Card key={id} style={{ width: 335, borderRadius: '20px' }}>
                  <div style={divFlex}>
                    <Title level={5}>{title}</Title>
                    <QrcodeOutlined
                      onClick={() => {
                        setFormId(id)
                        setFormTitle(title)
                        setQrValue(id)
                        setModalVisible(true)
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
              </Skeleton>
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
