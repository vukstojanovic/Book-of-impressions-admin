import { Navigate, Outlet } from 'react-router-dom'

import { PageLayout } from '@/components/layout'
import { Users } from '@/features/users'
import { Reviews } from '@/features/reviews'
import { Forms, CreateNewForm } from '@/features/forms'

const App = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/users',
        element: <Users />,
      },
      { path: '/profile', element: '<Profile />' },
      { path: '/forms', element: <Forms /> },
      { path: '/forms/createNewForm', element: <CreateNewForm /> },
      { path: '/reviews', element: <Reviews /> },
      { path: '/reports', element: '<Reports />' },
      { path: '/', element: '<Dashboard />' },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
