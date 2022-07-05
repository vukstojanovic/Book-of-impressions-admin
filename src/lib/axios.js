import Axios from 'axios'

import { appConfig } from '@/config/'

function authRequestInterceptor(config) {
  // const token = storage.getToken();
  // if (token) {
  //   config.headers.authorization = `${token}`;
  // }
  config.headers.Accept = 'application/json'
  config.headers['Content-Type'] = 'application/json'
  return config
}

export const axios = Axios.create({
  baseURL: `${appConfig.appBaseUrl}/api`,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)
