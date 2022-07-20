import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Upload, message, Tabs, Button } from 'antd'
import { useState } from 'react'
const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }

  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }

  return isJpgOrPng && isLt2M
}
export function Settings() {
  const { TextArea } = Input
  const { TabPane } = Tabs
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  // const [imageUrl, setImageUrl] = useState()

  const onFinish = (values) => {
    console.log(values)
  }

  const handleChange = (info) => {
    console.log(info)
    // if (info.file.status === 'uploading') {
    //   setLoading(true)
    //   return
    // }

    // if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, () => {
      setLoading(false)
      // setImageUrl(url)
      return
    })
    // }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )
  return (
    <Form size="large" layout="vertical" form={form} onFinish={onFinish}>
      <div style={{ display: 'flex', gap: 50 }}>
        <Form.Item label="Company name:" name="company-name">
          <Input placeholder="Company name" />
        </Form.Item>
        <Form.Item label="Company email:" name="company-email">
          <Input placeholder="Company name" />
        </Form.Item>
      </div>
      <Tabs defaultActiveKey="en" type="card">
        <TabPane tab="EN" key="en">
          <Form.Item name="en-company-description" label="Company description:EN">
            <TextArea
              placeholder="Company description"
              name="english-desc"
              autoSize={{ minRows: 6, maxRows: 10 }}
              style={{ width: '60%', marginTop: '6px' }}
            />
          </Form.Item>
        </TabPane>
        <TabPane tab="SR" key="sr">
          <Form.Item name="sr-company-description" label="Company description:SR">
            <TextArea
              placeholder="Company description"
              name="serbian-dec"
              autoSize={{ minRows: 6, maxRows: 10 }}
              style={{ width: '60%', marginTop: '6px' }}
            />
          </Form.Item>
        </TabPane>
      </Tabs>
      <Form.Item label="Company logo:" valuePropName="fileList">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={(true, { showPreviewIcon: false })}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          maxCount={1}
        >
          {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
          {uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item style={{ textAlign: 'right' }}>
        <Button style={{ marginRight: '10px' }}>Cancel</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
