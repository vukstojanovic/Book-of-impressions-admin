import { Link } from 'react-router-dom'
import { Typography, Row, Card, Progress } from 'antd'
import { QrcodeOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const { Title, Paragraph, Text } = Typography

const forms = [
  {
    id: 1,
    formNum: 125,
    description:
      'Aenean consequat feugiat magna sit amet maximus. Aliquam mollis turpis. Feugiat magna sit amet maximus',
    dataOne: 20,
    dataTwo: 35,
    dataThree: 56,
    curValue: 13,
    info: 13,
  },
  {
    id: 2,
    formNum: 126,
    description:
      'Interdum et malesuada fames ac ante ipsum primis in faucibus. Quis nisi non tincidunt. Ipsum primis in faucibus.',
    dataOne: 34,
    dataTwo: 47,
    dataThree: 23,
    curValue: 29,
    info: 17,
  },
  {
    id: 3,
    formNum: 127,
    description:
      'Proin pellentesque quis nisi non tincidunt. In hac habitasse platea dictumst. Quis nisi non tincidunt',
    dataOne: 88,
    dataTwo: 68,
    dataThree: 43,
    curValue: 97,
    info: 78,
  },
  {
    id: 4,
    formNum: 127,
    description:
      'Morbi porta, dui sed hendrerit tempor, mi risus pretium arcu, ut semper elit elit a arcu. Mi risus pretium arcu.',
    dataOne: 45,
    dataTwo: 89,
    dataThree: 34,
    curValue: 13,
    info: 64,
  },
  {
    id: 5,
    formNum: 128,
    description:
      'Cras sit amet quam at mauris mollis rhoncus dictum ac magna. Mauris mollis rhoncus dictum',
    dataOne: 20,
    dataTwo: 35,
    dataThree: 56,
    curValue: 13,
    info: 34,
  },
  {
    id: 6,
    formNum: 129,
    description:
      'Morbi suscipit, risus eu mollis convallis, nisi sem lacinia tortor, non eleifend mi elit vitae sapien.',
    dataOne: 64,
    dataTwo: 21,
    dataThree: 73,
    curValue: 26,
    info: 26,
  },
]

export const Forms = () => {
  const { t } = useTranslation('Forms')

  const divFlex = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
  const columnDivFlex = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <>
      <Row align="middle" justify="space-between" style={{ marginBottom: '1.75rem' }}>
        <Title level={2} style={{ marginBottom: '0' }}>
          {t('forms')}
        </Title>
        <Link to="/forms/create-new-form">
          <PlusCircleOutlined style={{ color: 'black', fontSize: '2.25rem' }} />
        </Link>
      </Row>
      <Row align="middle" style={{ gap: 50 }}>
        {forms.map((form) => {
          const { id, formNum, description, dataOne, dataTwo, dataThree, info } = form
          return (
            <Card key={id} style={{ width: 335, borderRadius: '20px' }}>
              <div style={divFlex}>
                <Title level={5}>ID: #{formNum}</Title>
                <QrcodeOutlined style={{ fontSize: '1.25rem' }} />
              </div>
              <Paragraph>{description}</Paragraph>
              <div style={divFlex}>
                <div style={columnDivFlex}>
                  <Progress
                    type="circle"
                    width={75}
                    percent={dataOne}
                    style={{ marginBottom: '0.75rem' }}
                  />
                  <Text strong>{info}/300</Text>
                </div>
                <div style={columnDivFlex}>
                  <Progress
                    type="circle"
                    width={75}
                    percent={dataTwo}
                    style={{ marginBottom: '0.75rem' }}
                  />
                  <Text strong>{info}/300</Text>
                </div>
                <div style={columnDivFlex}>
                  <Progress
                    type="circle"
                    width={75}
                    percent={dataThree}
                    style={{ marginBottom: '0.75rem' }}
                  />
                  <Text strong>{info}/300</Text>
                </div>
              </div>
            </Card>
          )
        })}
      </Row>
    </>
  )
}
