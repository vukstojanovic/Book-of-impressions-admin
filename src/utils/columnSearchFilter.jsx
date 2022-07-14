import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { useTranslation } from 'react-i18next'

export const getColumnSearchProps = (dataIndex, searchInput) => {
  const { t } = useTranslation('Users')

  const handleSearch = (confirm) => {
    confirm()
  }

  const handleReset = (clearFilters, confirm) => {
    clearFilters()
    confirm()
  }

  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={t(`${dataIndex}`)}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : [])
            confirm({ closeDropdown: false })
          }}
          onPressEnter={() => handleSearch(confirm)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
  }
}
