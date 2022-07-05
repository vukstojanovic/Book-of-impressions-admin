import { Navigate } from 'react-router-dom'

export const publicRoutes = [
  {
    path: '/sign-in',
    element: 'Sign in page',
  },
  {
    path: '/sign-up',
    element: 'Sign up page',
  },
  { path: '*', element: <Navigate to="/sign-in" /> },
]
