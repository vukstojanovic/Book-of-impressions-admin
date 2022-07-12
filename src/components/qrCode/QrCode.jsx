import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { QRCodeCanvas } from 'qrcode.react'
import { Button, Form, Input } from 'antd'

export const QrCode = () => {
  const [form] = Form.useForm()

  const [show, setShow] = useState(false)
  const [value, setValue] = useState('')

  const { t } = useTranslation('QRCode')

  const onFinish = () => {
    setValue(form.getFieldValue('URL'))
    setShow(true)
  }

  const onFinishFailed = () => {
    setShow(false)
    setValue('')
  }

  return (
    <div style={{ display: 'grid', justifyItems: 'center', textAlign: 'center' }}>
      <Form
        requiredMark={false}
        form={form}
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        layout="inline"
      >
        <Form.Item
          label="URL:"
          name={'URL'}
          rules={[
            { required: true, message: t('requiredError') },
            { type: 'url', message: t('urlError') },
          ]}
        >
          <Input placeholder={t('placeholder')} allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="button">
            Generate QR Code
          </Button>
        </Form.Item>
      </Form>
      {show && <QRCodeCanvas style={{ marginTop: 12 }} value={value} includeMargin={true} />}
    </div>
  )
}
