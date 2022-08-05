import { useMutation } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const inviteUser = ({ data }) => {
  return axios({ method: 'post', url: 'api/wapp/user/invite', data })
}

export const useInviteUser = ({ form, t, setDisabled }) => {
  return useMutation({
    onSuccess: () => {
      message.success(t('invite_success'))
      form.resetFields()
      setDisabled(true)
    },
    onError: () => {
      message.error(t('invite_error'))
      setDisabled(false)
    },
    mutationFn: inviteUser,
  })
}
