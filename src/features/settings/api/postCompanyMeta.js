import { useMutation, useQueryClient } from 'react-query'

import { axios } from '@/lib/axios'

export const updateCompanyMeta = (data) => {
  return axios({
    method: 'PATCH',
    url: `/api/wapp/company-meta`,
    data,
  })
}

export const useUpdateCompanyMeta = () => {
  const queryClient = useQueryClient()
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['company'])
      queryClient.invalidateQueries(['company-meta'])
    },
    mutationFn: updateCompanyMeta,
  })
}
