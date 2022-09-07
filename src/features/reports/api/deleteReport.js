import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const deleteReport = (id) => {
  return axios({
    method: 'delete',
    url: `/api/wapp/report/${id}`,
  })
}

export const useDeleteReport = ({ close, t }) => {
  const queryClient = useQueryClient()

  return useMutation(deleteReport, {
    onSuccess: () => {
      queryClient.invalidateQueries(['allReports'])
      message.success(t('success_delete'))
      close()
    },
    onError: () => message.error(t('error')),
  })
}
