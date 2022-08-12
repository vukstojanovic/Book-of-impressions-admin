import { Navigate } from 'react-router-dom'

import { SignupForm } from '@/features/auth'
import { LoginForm } from '@/features/auth'
import { VerifyUser } from '@/features/auth'

export const publicRoutes = [
  {
    path: '/sign-in',
    element: <LoginForm />,
  },
  {
    path: '/sign-up',
    element: <SignupForm />,
  },
  {
    path: '/auth/confirm',
    search: '?token=:token',
    element: <VerifyUser />,
  },
  { path: '*', element: <Navigate to="/sign-in" /> },
]
