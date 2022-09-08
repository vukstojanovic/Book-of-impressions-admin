import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const updateCompanyMeta = (data) => {
  return axios({
    method: 'PATCH',
    url: `/api/wapp/company-meta`,
    data,
  })
}

export const useUpdateCompanyMeta = ({ t }) => {
  const queryClient = useQueryClient()
  return useMutation({
    onSuccess: () => {
      message.success(t('submit_success'), 3)
      queryClient.invalidateQueries(['company'])
      queryClient.invalidateQueries(['company-meta'])
    },
    onError: () => {
      message.error(t('submit_error'), 3)
    },
    mutationFn: updateCompanyMeta,
  })
}
