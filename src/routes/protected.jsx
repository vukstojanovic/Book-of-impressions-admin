import { Navigate, Outlet } from 'react-router-dom'

import { PageLayout } from '@/components/layout'
import { Users, InviteUser } from '@/features/users'
import { Reviews } from '@/features/reviews'
import { Forms, FormPreview, EditOrPostForm } from '@/features/forms'
import { Settings } from '@/features/settings'
import { ProfileSettings } from '@/features/profileSettings'
import { Reports } from '@/features/reports'
import { GoogleReviews } from '@/features/googleReviews'
/* import { TripadvisorReviews } from '@/features/tripadvisorReviews' */
import Dashboard from '@/features/dashboard/Dashboard'

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
      { path: '/forms/create-new-form', element: <EditOrPostForm type="post" /> },
      { path: '/forms/edit', element: <EditOrPostForm type="edit" /> },
      { path: '/forms/:formTitle', element: <FormPreview /> },
      { path: '/reviews', element: <Reviews /> },
      { path: '/google-reviews', element: <GoogleReviews /> },
      /* { path: '/tripadvisor-reviews', element: <TripadvisorReviews /> }, */
      { path: '/reports', element: <Reports /> },
      { path: '/settings', element: <Settings /> },
      { path: '/my-profile', element: <ProfileSettings /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
]
