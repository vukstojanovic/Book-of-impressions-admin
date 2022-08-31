import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { useTranslation } from 'react-i18next'

const COLORS = ['#f66702', '#1b4979', '#133659', '#7fc400', '#fe00d4', '#c40000']

import styles from './ChartPie.module.css'

export const ChartPie = ({ data, halfPie }) => {
  const { t } = useTranslation('Charts')

  const createDataArray = () => {
    return Object.entries(data).map(([key, value]) => {
      return {
        name: `${key === 'positive' ? 'yes' : ''}${key === 'negative' ? 'no' : ''}`,
        value: Number(value) || 1,
      }
    })
  }

  const pieChartData =
    !halfPie && data
      ? // Case for Answers chart
        createDataArray()
      : // Case for halfPie chart
        [
          { name: 'positive', value: Number(data?.total_positive) || 1 },
          { name: 'negative', value: Number(data?.total_negative) || 1 },
        ]

  const renderCustomizedLabel = ({ x, y, cx, percent, name }) => {
    return (
      <>
        <text
          fontSize={'10px'}
          x={x}
          y={y < 135 ? y : y + 20}
          textAnchor={x > cx ? 'start' : 'end'}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text
          className={styles.pieText}
          x={x}
          y={y < 135 ? y - 10 : y + 10}
          textAnchor={x > cx ? 'start' : 'end'}
        >
          {t(`${name}`)}
        </text>
      </>
    )
  }
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart id="chart-pie" margin={{ top: halfPie ? 70 : 0 }}>
        <Tooltip
          itemStyle={{ textTransform: 'capitalize' }}
          formatter={(value, name) => [value, t(`${name}`)]}
          wrapperStyle={{ outline: 'none' }}
        />
        <Pie
          data={pieChartData}
          dataKey="value"
          startAngle={halfPie ? 180 : 0}
          endAngle={halfPie ? 0 : 360}
          cx="50%"
          cy="50%"
          fill="#8884d8"
          outerRadius={70}
          innerRadius={35}
          label={renderCustomizedLabel}
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
