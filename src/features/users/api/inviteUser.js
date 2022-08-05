import { useMutation } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const inviteUser = ({ data }) => {
  return axios({ method: 'post', url: 'api/wapp/user/invite', data })
}

export const useInviteUser = ({ form }) => {
  return useMutation({
    onSuccess: () => {
      message.success('Successfully invited used')
      form.resetFields()
    },
    onError: () => {
      message.error('Oops!Something went wrong')
    },
    mutationFn: inviteUser,
  })
}
