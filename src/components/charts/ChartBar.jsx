import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'

export const ChartBar = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" minHeight={200}>
      <BarChart margin={{ top: 30 }} width={260} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={'value'} fill={'#1890ff'} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  )
}
