import Axios from 'axios'

import storage from '@/utils/storage'
import { appConfig } from '@/config/'
import { getNewAccessToken } from '@/api/auth'

function authRequestInterceptor(config) {
  const token = storage.get('access_token')

  if (token) {
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
    console.log(error)
    const originalRequest = error.config
    if (error.response.status === 404 && !originalRequest._retry) {
      originalRequest._retry = true
      const access_token = await getNewAccessToken()
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
      return axios(originalRequest)
    }
    return Promise.reject(error)
  }
)
