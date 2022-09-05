import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography, Row, Card, Skeleton, Empty, Button, Col, Statistic } from 'antd'
import { Pie, PieChart, Cell, Tooltip } from 'recharts'
import { QrcodeOutlined } from '@ant-design/icons'

import { useForms } from '../api/getForms'
import { useGetFormAnalyticsAllQuery } from '../api/getFormAnalytics'

import QRCodeFormModal from './QRCodeFormModal'

import { AddButton } from '@/components/buttons/AddButton'
import { FilterComponent } from '@/components/filterComponent'

const { Title, Text } = Typography

export const Forms = () => {
  const location = useLocation()
  const decodedQueryParams = decodeURIComponent(location.search)
  const { data, isLoading } = useForms(decodedQueryParams)
  const { data: analyticsData, isLoading: isAnalyticsLoading } = useGetFormAnalyticsAllQuery(data)
  const {
    i18n: { language },
    t,
  } = useTranslation('Forms')

  const navigate = useNavigate()
  const [formTitle, setFormTitle] = useState('')
  const [formId, setFormId] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const divFlex = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }

  console.log(analyticsData)

  const columnDivFlex = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const colors = ['#f66702', '#1b4979', '#133659', '#7fc400', '#fe00d4', '#c40000']

  if (!isLoading && data[0].length === 0) {
    return (
      <>
        <Row justify="space-between" align="top">
          <Col span={22}>
            <FilterComponent hasType hasTitle />
          </Col>
          <Col style={{ paddingTop: '2px' }}>
            <AddButton linkTo="/forms/create-new-form" />
          </Col>
        </Row>
        <Empty
          description={
            <span>
              <b>{t('no_results')}</b>
            </span>
          }
        />
      </>
    )
  }

  return (
    <>
      <Row justify="space-between" align="top">
        <Col span={22}>
          <FilterComponent hasType hasTitle />
        </Col>
        <Col style={{ paddingTop: '2px' }}>
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
        {!isLoading && !isAnalyticsLoading ? (
          data[0]?.map((form, index) => {
            const { id, title, description } = form
            const singleAnalytic = analyticsData[index]
            const pieChartData = Object.entries(singleAnalytic)
              .filter(
                (entry) => entry[0] !== 'anonymous' && entry[0] !== 'total' && entry[0] !== 'type'
              )
              .map((entry) => ({ name: entry[0], value: Number(entry[1]) }))
            console.log(pieChartData)
            return (
              <Card
                hoverable
                key={id}
                onClick={() => navigate(`/forms/${title}?id=${id}`)}
                style={{ width: 335, borderRadius: '20px' }}
              >
                <div style={divFlex}>
                  <Title level={5}>{title}</Title>
                  <Button
                    type="text"
                    size="large"
                    onClick={(e) => {
                      setFormId(id)
                      setFormTitle(title)
                      setModalVisible(true)
                      e.stopPropagation()
                    }}
                  >
                    <QrcodeOutlined style={{ fontSize: '18px' }} />
                  </Button>
                </div>
                <Text ellipsis style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                  {description.filter((lang) => lang.key === language)[0]?.text}
                </Text>
                <div style={divFlex}>
                  <div style={columnDivFlex}>
                    <Statistic
                      title={t('total_number_of_reviews')}
                      value={singleAnalytic.total}
                      valueStyle={{ fontSize: '25px' }}
                    />
                    {/* <Progress
                      type="circle"
                      width={75}
                      percent={50}
                      style={{ marginBottom: '0.75rem' }}
                    />
                    <Text strong>150/300</Text> */}
                  </div>
                  <div style={columnDivFlex}>
                    <Statistic
                      title={t('anonymous_reviews')}
                      value={singleAnalytic.anonymous}
                      valueStyle={{ fontSize: '25px' }}
                    />
                    {/* <Progress
                      type="circle"
                      width={75}
                      percent={70}
                      style={{ marginBottom: '0.75rem' }}
                    /> */}
                    {/* <Text strong>250/300</Text> */}
                  </div>
                  <div style={columnDivFlex}>
                    <PieChart width={100} height={100}>
                      <Tooltip
                        itemStyle={{ textTransform: 'capitalize' }}
                        formatter={(value, name) => [value, name]}
                        wrapperStyle={{ outline: 'none' }}
                      />
                      <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        fill="#8884d8"
                      >
                        {pieChartData.map((_entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                    {/* <Progress
                      type="circle"
                      width={75}
                      percent={30}
                      style={{ marginBottom: '0.75rem' }}
                    />
                    <Text strong>30/300</Text> */}
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
