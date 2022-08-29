import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { useTranslation } from 'react-i18next'

const COLORS = ['#f66702', '#1b4979', '#133659', '#7fc400', '#fe00d4', '#c40000']

export const ChartPie = ({ data, halfPie }) => {
  const { t } = useTranslation('Charts')

  const renderCustomizedLabel = ({ x, y, cx, percent, name }) => {
    return (
      <>
        <text fontSize={'10px'} x={x} y={y} textAnchor={x > cx ? 'start' : 'end'}>
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text fontSize={'10px'} x={x} y={y - 10} textAnchor={x > cx ? 'start' : 'end'}>
          {t(`${name}`)}
        </text>
      </>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart margin={{ top: halfPie ? 70 : 0 }}>
        <Tooltip
          itemStyle={{ color: 'blue' }}
          formatter={(value, name) => [value + '%', t(`${name}`)]}
        />
        <Pie
          data={data}
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
