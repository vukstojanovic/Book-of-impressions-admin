import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'
import { useTranslation } from 'react-i18next'

export const ChartBar = ({ data }) => {
  const { t } = useTranslation('Charts')
  return (
    <ResponsiveContainer width="100%" minHeight={200}>
      <BarChart margin={{ top: 30 }} width={260} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickFormatter={(props) => t(`${props.toLowerCase()}`)} />
        <YAxis />
        <Tooltip
          cursor={{ fill: 'rgba(19, 54, 89, 0.5)' }}
          formatter={(value) => [value, t('value')]}
          labelFormatter={(props) => {
            switch (props) {
              case 'Answer':
                return t('answer')
              case 'Rating':
                return t('rating')
              case 'Ratings':
                return t('ratings')
              case '5':
                return `5 ${t('stars_2')}`
              case '4':
                return `4 ${t('stars')}`
              case '3':
                return `3 ${t('stars')}`
              case '2':
                return `2 ${t('stars')}`
              case '1':
                return `1 ${t('star')}`
              default:
                return props
            }
          }}
        />
        <Bar dataKey={'value'} fill={'#f66702'} background={{ fill: '#1b4979' }} barSize={60} />
      </BarChart>
    </ResponsiveContainer>
  )
}
