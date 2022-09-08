import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const createNewReport = (data) => {
  return axios({
    method: 'post',
    url: '/api/wapp/report',
    data,
  })
}

export const useCreateNewReport = ({ t }) => {
  const queryClient = useQueryClient()
  return useMutation(createNewReport, {
    onSuccess: () => {
      queryClient.invalidateQueries(['allReports'])
      message.success(t('success_create'))
    },
    onError: () => message.error(t('error')),
  })
}
