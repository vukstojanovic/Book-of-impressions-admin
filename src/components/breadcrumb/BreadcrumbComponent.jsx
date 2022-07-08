import { Breadcrumb } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'

export const BreadcrumbComponent = () => {
  const location = useLocation()
  const { pathname } = location
  const pathnames = pathname?.split('/').filter((item) => item)
  const breadcrumbItemStyle = { fontSize: '24px', textTransform: 'capitalize' }
  const { t } = useTranslation('SideMenu')

  return (
    <Breadcrumb>
      {pathnames.length > 0 ? (
        <Breadcrumb.Item style={breadcrumbItemStyle}>
          <Link to="/">{t('home')}</Link>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item style={breadcrumbItemStyle}>{t('home')}</Breadcrumb.Item>
      )}
      {pathnames.map((pName, index) => {
        const route = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        return isLast ? (
          <Breadcrumb.Item key={index} style={breadcrumbItemStyle}>
            {t(pName).replace('-', '_')}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={index} style={breadcrumbItemStyle}>
            <Link to={route}>{t(pName).replace('-', '_')}</Link>
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}
