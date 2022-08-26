import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts'

export const ChartBar = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" minHeight={200}>
      <BarChart margin={{ top: 30 }} width={260} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          cursor={{ fill: 'rgba(19, 54, 89, 0.5)' }}
          formatter={(value, name, props) => {
            console.log(value, name, props)
            return [`${value}`, 'Value']
          }}
          labelFormatter={(props) => {
            switch (props) {
              case '5':
                return '5 Stars'
              case '4':
                return '4 Stars'
              case '3':
                return '3 Stars'
              case '2':
                return '2 Stars'
              case '1':
                return '1 Star'
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
