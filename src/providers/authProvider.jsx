import { initReactQueryAuth } from 'react-query-auth'
import { Spin } from 'antd'
import { Navigate } from 'react-router-dom'

import { loginUser, handleLogout, registerUser, getLoggedInUser } from '@/features/auth'
import storage from '@/utils/storage'

async function handleUserResponse(data) {
  Object.entries(data).forEach(([key, value]) => {
    storage.set(key, value)
  })

  const user = await getLoggedInUser()

  return user
}

async function loadUser() {
  if (storage.get('access_token')) {
    try {
      const data = await getLoggedInUser()

      return data
    } catch (error) {
      console.log('Error getting logged in user: ', error)
      return null
    }
  }

  return null
}

async function loginFn(data) {
  const response = await loginUser(data)
  const user = await handleUserResponse(response)
  return user
}

async function registerFn(data) {
  const response = await registerUser(data)
  const user = await handleUserResponse(response)
  return user
}

async function logoutFn() {
  try {
    await handleLogout()
    storage.clear('access_token')
    storage.clear('refresh_token')
    // window.location.assign(window.location.origin)
    return <Navigate to="/" replace={true} />
  } catch (error) {
    console.log('logout error: ', error)
    return error
  }
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin />
      </div>
    )
  },
}

export const { AuthProvider, useAuth } = initReactQueryAuth(authConfig)
