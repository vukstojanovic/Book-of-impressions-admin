import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'

import { data } from './barDummyData'

export const ChartBar = () => {
  return (
    <ResponsiveContainer width={300} height="80%" minWidth={150} minHeight={150}>
      <BarChart data={data} startAngle={60} st>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={'value'} fill={'#8aa325'} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  )
}
