import { Navigate, Outlet } from 'react-router-dom'

import { PageLayout } from '@/components/layout'
import { Users, InviteUser } from '@/features/users'
import { Reviews } from '@/features/reviews'
import { Forms } from '@/features/forms'

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
      {
        path: '/users/invite-user',
        element: <InviteUser />,
      },
      { path: '/profile', element: '<Profile />' },
      { path: '/forms', element: <Forms /> },
      { path: '/reviews', element: <Reviews /> },
      { path: '/reports', element: '<Reports />' },
      { path: '/', element: '<Dashboard />' },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
