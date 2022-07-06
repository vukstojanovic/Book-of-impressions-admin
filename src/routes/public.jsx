import { Navigate } from 'react-router-dom'
import { LoginForm } from '@/features/auth'

export const publicRoutes = [
  {
    path: '/sign-in',
    element: <LoginForm />,
  },
  {
    path: '/sign-up',
    element: 'Sign up page',
  },
  { path: '*', element: <Navigate to="/sign-in" /> },
]
