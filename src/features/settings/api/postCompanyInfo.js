import { useMutation } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const updateCompanyInfo = ({ formData }) => {
  return axios({
    method: 'patch',
    url: `/api/wapp/company`,
    data: formData,
  })
}

export const useUpdateCompanyInfo = ({ form, setSelectedLogos, setButtonDisabled, t, refetch }) => {
  return useMutation({
    onSuccess: () => {
      message.success(t('submit_success'), 3)
      form.resetFields()
      setSelectedLogos(null)
      setButtonDisabled(true)
      refetch()
    },
    onError: () => {
      message.error(t('submit_error'), 3)
    },
    mutationFn: updateCompanyInfo,
  })
}
