import { useMutation } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const editForm = ({ data, id }) => {
  return axios({ method: 'patch', url: `/api/wapp/form/${id}`, data })
}

export const useEditFormQuery = ({ form, t, setShowInfoQuestion }) => {
  return useMutation({
    onError: () => {
      message.error(t('submitError'))
    },
    onSuccess: () => {
      message.success(t('submitSuccess'))
      setShowInfoQuestion(false)
      form.resetFields()
    },
    mutationFn: editForm,
  })
}
