import { Navigate, Outlet } from 'react-router-dom'

import { MainLayout } from '@/components/layout'

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/users', element: '<Users />' },
      { path: '/profile', element: '<Profile />' },
      { path: '/', element: '<Dashboard />' },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
