import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { GetUserInfoResponse } from '../../types/api-response-types/user'
import { getUserInfoAPI } from '../../api/userAPI'

function useUserInfo(
  options?: Omit<UseQueryOptions<GetUserInfoResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery<GetUserInfoResponse>({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfoAPI,
    ...options,
  })
}

export { useUserInfo }
