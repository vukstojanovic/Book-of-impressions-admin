import { useMutation } from 'react-query'

import { axios } from '@/lib/axios'

export const inviteUser = ({ data }) => {
  return axios({ method: 'post', url: 'api/wapp/user/invite', data })
}

export const useInviteUser = () => {
  return useMutation({
    onSuccess: () => {
      console.log('success')
    },
    mutationFn: inviteUser,
  })
}
