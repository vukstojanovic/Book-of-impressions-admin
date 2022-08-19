import { Breadcrumb } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'

export const BreadcrumbComponent = () => {
  const location = useLocation()
  const { pathname } = location
  const pathnames = pathname?.split('/').filter((item) => item)
  const breadcrumbStyle = { fontSize: '22px', textTransform: 'capitalize', marginBottom: '20px' }
  const { t } = useTranslation('SideMenu')

  return (
    <Breadcrumb style={breadcrumbStyle}>
      {pathnames.length > 0 ? (
        <Breadcrumb.Item>
          <Link to="/">{t('home')}</Link>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item>{t('home')}</Breadcrumb.Item>
      )}
      {pathnames.map((pName, index) => {
        const route = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        return isLast ? (
          <Breadcrumb.Item key={index}>
            {pName.includes('%') ? t(pName.replaceAll('%20', ' ')) : t(pName.replaceAll('-', '_'))}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={index}>
            <Link to={route}>{t(pName.replaceAll('-', '_'))}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}
