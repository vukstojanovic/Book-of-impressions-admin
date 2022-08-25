import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'

import { data } from './barDummyData'

export const ChartBar = () => {
  return (
    <ResponsiveContainer width="100%" minHeight={200}>
      <BarChart margin={{ top: 30 }} width={260} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={'value'} fill={'#8aa325'} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  )
}
