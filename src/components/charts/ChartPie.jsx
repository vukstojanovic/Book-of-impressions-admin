import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#0d1216', '#7fc400', '#fe00d4', '#c40000']
export const ChartPie = ({ data, halfPie }) => {
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
    <ResponsiveContainer width="100%" height={220}>
      <PieChart margin={{ top: halfPie ? 70 : 0 }}>
        <Tooltip />
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
