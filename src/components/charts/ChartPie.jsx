import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts'

import { data } from './pieDummyData'

const COLORS = ['#0088FE', '#00C49F', '#0d1216', '#7fc400', '#fe00d4', '#c40000']
export const ChartPie = () => {
  const renderCustomizedLabel = ({ x, y, cx, percent, name }) => {
    return (
      <>
        <text fontSize={'10px'} x={x} y={y} textAnchor={x > cx ? 'start' : 'end'}>
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text fontSize={'10px'} x={x} y={y - 10} textAnchor={x > cx ? 'start' : 'end'}>
          {`${name}`}
        </text>
      </>
    )
  }

  return (
    <ResponsiveContainer minHeight={200} minWidth={200}>
      <PieChart margin={{ top: 70 }}>
        <Tooltip />
        <Pie
          data={data}
          dataKey="value"
          startAngle={180}
          endAngle={0}
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
