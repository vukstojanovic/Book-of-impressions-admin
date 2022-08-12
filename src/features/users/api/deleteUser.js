import { useMutation } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const deleteUser = ({ id }) => {
  return axios({
    method: 'delete',
    url: `api/wapp/user/${id}`,
  })
}

export const useDeleteUser = ({ refetchUsers, closeDeleteModal }) => {
  return useMutation({
    onSuccess: () => {
      message.success('Delete Success')
      closeDeleteModal()
      refetchUsers()
    },
    onError: () => {
      message.error('Delete Error')
    },
    mutationFn: deleteUser,
  })
}
