import { useMutation } from 'react-query'
import { message } from 'antd'

import { axios } from '@/lib/axios'

export const editUser = ({ data, id }) => {
  return axios({
    method: 'patch',
    url: `api/wapp/user/${id}`,
    data,
  })
}

export const useEditUser = ({ refetch, closeEditModal }) => {
  return useMutation({
    onSuccess: () => {
      message.success('Edit Success')
      refetch()
      closeEditModal()
    },
    onError: () => {
      message.error('Edit Error')
    },
    mutationFn: editUser,
  })
}
