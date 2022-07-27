import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Upload, message, Tabs, Button } from 'antd'
import { useState } from 'react'

import { getBase64 } from '@/utils/getBase64'
import { beforeUpload } from '@/utils/beforeImageUpload'
export function Settings() {
  const { TextArea } = Input
  const { TabPane } = Tabs
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  // const [imageUrl, setImageUrl] = useState()

  const onFinish = (values) => {
    message.success('Success')
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
    <Form
      size="large"
      layout="vertical"
      form={form}
      onFinish={onFinish}
      style={{ backgroundColor: 'white', padding: '10px 30px' }}
    >
      <div style={{ display: 'flex', gap: 50 }}>
        <Form.Item label="Company name:" name="company-name">
          <Input placeholder="Company name" />
        </Form.Item>
        <Form.Item label="Company email:" name="company-email">
          <Input placeholder="Company name" />
        </Form.Item>
      </div>
      <p style={{ marginBottom: '-10px' }}>Company description:</p>
      <Tabs
        defaultActiveKey="en"
        type="line"
        hideAdd
        tabBarGutter={40}
        tabBarStyle={{ margin: '0 0 10px 30px', width: 85 }}
      >
        <TabPane tab="EN" key="en">
          <Form.Item name="en-desc">
            <TextArea
              placeholder="Company description"
              name="english-desc"
              autoSize={{ minRows: 6, maxRows: 10 }}
              style={{ width: '60%', marginTop: '6px' }}
            />
          </Form.Item>
        </TabPane>
        <TabPane tab="SR" key="sr">
          <Form.Item name="sr-desc">
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
          action="UploadUrl"
        >
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
