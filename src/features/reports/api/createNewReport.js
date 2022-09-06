import { useMutation, useQueryClient } from 'react-query'

import { axios } from '@/lib/axios'

export const createNewReport = (data) => {
  return axios({
    method: 'post',
    url: '/api/wapp/report',
    data,
  })
}

export const useCreateNewReport = () => {
  const queryClient = useQueryClient()
  return useMutation(createNewReport, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reports'])
    },
    onError: () => console.log('error!'),
  })
}
