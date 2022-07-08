import { Breadcrumb } from 'antd'
import { useLocation, Link } from 'react-router-dom'

export const BreadcrumbComponent = () => {
  const location = useLocation()
  const { pathname } = location
  const pathnames = pathname?.split('/').filter((item) => item)
  const breadcrumbItemStyle = { fontSize: '24px', textTransform: 'capitalize' }

  return (
    <Breadcrumb>
      {pathnames.length > 0 ? (
        <Breadcrumb.Item style={breadcrumbItemStyle}>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item style={breadcrumbItemStyle}>Home</Breadcrumb.Item>
      )}
      {pathnames.map((pName, index) => {
        const route = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        return isLast ? (
          <Breadcrumb.Item key={index} style={breadcrumbItemStyle}>
            {pName.replace('-', ' ')}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={index} style={breadcrumbItemStyle}>
            <Link to={route}>{pName.replace('-', ' ')}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}
