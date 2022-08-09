import { useMutation } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const updateCompanyInfo = (id, data) => {
  return axios({
    method: 'patch',
    url: `/api/wapp/company/${id}`,
    data,
  })
}

export const useUpdateCompanyInfo = ({ form, setSelectedLogos, setButtonDisabled, t }) => {
  return useMutation({
    onSuccess: () => {
      message.success(t('submit_success'), 3)
      form.resetFields()
      setSelectedLogos(null)
      setButtonDisabled(true)
    },
    onError: () => {
      message.error(t('submit_error'), 3)
    },
    mutationFn: updateCompanyInfo,
  })
}
