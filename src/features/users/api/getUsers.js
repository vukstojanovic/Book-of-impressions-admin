import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

export const getUsers = () => {
  return axios({ method: 'get', url: '/api/wapp/users' })
}

export const useGetUsers = () => {
  return useQuery('allUsers', getUsers)
}
