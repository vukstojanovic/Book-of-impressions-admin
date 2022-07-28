import { Modal, Row, Typography } from 'antd'
import { QRCodeCanvas } from 'qrcode.react'
import { useTranslation } from 'react-i18next'

const QRCodeFormModal = ({ formId, formTitle, setModalVisible, modalVisible, qrValue }) => {
  const { Text } = Typography

  const { t } = useTranslation('QRCode')
  const handleOk = () => {
    const canvas = document.getElementById('qr-gen')

    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    let downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = `${qrValue}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  const handleCancel = () => {}

  return (
    <Modal
      title={`${formTitle}`}
      okText={t('downloadQRCode')}
      cancelText={t('done')}
      centered
      width={400}
      visible={modalVisible}
      bodyStyle={{ padding: '24px 0', display: 'grid', justifyItems: 'center' }}
      onOk={() => {
        handleOk()
        setModalVisible(false)
      }}
      onCancel={() => {
        handleCancel()
        setModalVisible(false)
      }}
    >
      <Row
        justify="center"
        style={{
          border: '2px solid lightgray',
          borderRadius: '8px',
          margin: '0 40px 0px',
        }}
      >
        <QRCodeCanvas
          id="qr-gen"
          value={formId}
          includeMargin
          size={256}
          level="H"
          imageSettings={{ src: '/img/b.png', width: 39, height: 60, excavate: true }}
        />
        <Text style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 24px 0' }}>
          {t('leaveAnImpression')}
        </Text>
      </Row>
    </Modal>
  )
}

export default QRCodeFormModal
