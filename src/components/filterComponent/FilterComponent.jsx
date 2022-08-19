import { Input, Form, Button } from 'antd'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const FilterComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search'))

  function handleSearch() {
    const search = value
    if (search) {
      setSearchParams({ search })
    } else {
      setSearchParams({})
    }
  }

  return (
    <>
      <Form onFinish={handleSearch} style={{ marginBottom: '20px' }}>
        {/* <Form.Item>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: '300px' }}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Search</Button>
        </Form.Item> */}
        <Input.Group compact>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: '300px' }}
          />
          <Button htmlType="submit" type="primary">
            Search
          </Button>
        </Input.Group>
      </Form>
    </>
  )
}
