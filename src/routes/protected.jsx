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
      { path: '/forms', element: '<Forms />' },
      { path: '/reviews', element: '<Reviews />' },
      { path: '/reports', element: '<Reports />' },
      { path: '/', element: '<Dashboard />' },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
