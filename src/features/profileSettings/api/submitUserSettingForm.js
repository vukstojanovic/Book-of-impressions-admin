import { useMutation, useQuery, useQueryClient } from 'react-query'

import { axios } from '@/lib/axios'

export const patchUserProfileData = (data) => {
  return axios({
    method: 'patch',
    url: '/api/wapp/me',
    data,
  })
}

export const getUserProfileData = () => {
  return axios({
    method: 'get',
    url: '/api/wapp/me',
  })
}

export const useGetUserDataQuery = () => {
  return useQuery(['userSettingForm'], getUserProfileData)
}

export const usePatchUserDataMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(patchUserProfileData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userSettingForm'])
    },
  })
}
