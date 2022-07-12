import { Button, Form, Input } from 'antd'
import { QRCodeCanvas } from 'qrcode.react'
import { useState } from 'react'

export const QrCode = () => {
  const [form] = Form.useForm()

  const [show, setShow] = useState(false)
  const [value, setValue] = useState('')
  const onFinish = () => {
    setShow(true)
    setValue(form.getFieldValue('URL'))
  }

  const onFinishFailed = () => {
    setShow(false)
    setValue('')
  }

  return (
    <div style={{ display: 'grid', justifyItems: 'center', textAlign: 'center' }}>
      <Form form={form} onFinishFailed={onFinishFailed} onFinish={onFinish} layout="inline">
        <Form.Item
          label="URL:"
          name={'URL'}
          rules={[
            { required: true, message: 'Field can not be empty' },
            { type: 'url', message: 'Please input a valid URL' },
            { type: 'string', min: 4, message: 'URL must be at least 4 characters' },
          ]}
        >
          <Input placeholder="Input URL for QR code" allowClear />
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
