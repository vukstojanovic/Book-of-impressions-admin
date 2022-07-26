import { Navigate, Outlet } from 'react-router-dom'

import { PageLayout } from '@/components/layout'
import { Users, InviteUser } from '@/features/users'
import { Reviews } from '@/features/reviews'
import { Forms, CreateNewForm } from '@/features/forms'
import { Settings } from '@/features/settings'
import { ProfileSettings } from '@/features/profileSettings'

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
      { path: '/forms/create-new-form', element: <CreateNewForm /> },
      { path: '/reviews', element: <Reviews /> },
      { path: '/reports', element: '<Reports />' },
      { path: '/settings', element: <Settings /> },
      { path: '/my-profile', element: <ProfileSettings /> },
      { path: '/', element: '<Dashboard />' },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
