import Axios from 'axios'

import storage from '@/utils/storage'
import { appConfig } from '@/config/'
import { refreshToken } from '@/features/auth/api/getNewAccess'

function authRequestInterceptor(config) {
  let token

  if (config.url === '/api/public/auth/refresh') {
    token = storage.get('refresh_token')
    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    return config
  }

  token = storage.get('access_token')
  if (token && config.url !== '/api/public/auth/refresh') {
    config.headers = {
      Authorization: `Bearer ${token}`,
    }
  }

  config.headers.Accept = 'application/json'
  config.headers['Content-Type'] = 'application/json'
  return config
}

export const axios = Axios.create({
  baseURL: `${appConfig.appBaseUrl}`,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.message !== 'Wrong password'
    ) {
      originalRequest._retry = true

      const data = await refreshToken()

      Object.entries(data).forEach(([key, value]) => {
        storage.set(key, value)
      })

      return axios(originalRequest)
    }
    return Promise.reject(error)
  }
)
