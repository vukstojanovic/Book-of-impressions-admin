import { useMutation } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const postForm = (data) => {
  return axios({ method: 'post', url: '/api/wapp/form', data })
}

export const usePostFormQuery = ({ form, t, setShowInfoQuestion }) => {
  return useMutation({
    onError: () => {
      message.error(t('submitError'))
    },
    onSuccess: () => {
      message.success(t('submitSuccess'))
      setShowInfoQuestion(false)
      form.resetFields()
    },
    mutationFn: postForm,
  })
}
