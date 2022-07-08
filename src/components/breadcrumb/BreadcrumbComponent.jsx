import { Breadcrumb } from 'antd'
import { useLocation, Link } from 'react-router-dom'

export const BreadcrumbComponent = () => {
  const location = useLocation()
  const { pathname } = location
  console.log(pathname)
  const pathnames = pathname.split('/').filter((item) => item)

  return (
    <Breadcrumb>
      {pathnames &&
        pathnames.map((pn, index) => {
          return (
            <Breadcrumb.Item key={index}>
              <Link>{pn}</Link>
            </Breadcrumb.Item>
          )
        })}
      {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Users</Breadcrumb.Item>
      <Breadcrumb.Item>User Details</Breadcrumb.Item> */}
    </Breadcrumb>
  )
}
