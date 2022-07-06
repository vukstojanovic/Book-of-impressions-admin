import { Navigate } from 'react-router-dom'
import { SignupForm } from '@/features/auth'

export const publicRoutes = [
  {
    path: '/sign-in',
    element: 'Sign in page',
  },
  {
    path: '/sign-up',
    element: <SignupForm />,
  },
  { path: '*', element: <Navigate to="/sign-in" /> },
]
