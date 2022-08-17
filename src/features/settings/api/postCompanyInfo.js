import { useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const updateCompanyInfo = ({ formData }) => {
  return axios({
    method: 'patch',
    url: `/api/wapp/company`,
    data: formData,
  })
}

export const useUpdateCompanyInfo = ({ setButtonDisabled, t }) => {
  const queryClient = useQueryClient()
  return useMutation({
    onSuccess: () => {
      message.success(t('submit_success'), 3)
      setButtonDisabled(true)
      queryClient.invalidateQueries(['company'])
    },
    onError: () => {
      message.error(t('submit_error'), 3)
    },
    mutationFn: updateCompanyInfo,
  })
}
