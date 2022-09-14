import { useMutation, useQueryClient } from 'react-query'

import { axios } from '@/lib/axios'

export const updateCompanyInfo = ({ formData }) => {
  return axios({
    method: 'patch',
    url: `/api/wapp/company`,
    data: formData,
  })
}

export const useUpdateCompanyInfo = ({ setButtonDisabled }) => {
  const queryClient = useQueryClient()
  return useMutation({
    onSuccess: () => {
      setButtonDisabled(true)
      queryClient.invalidateQueries(['company'])
    },
    mutationFn: updateCompanyInfo,
  })
}
