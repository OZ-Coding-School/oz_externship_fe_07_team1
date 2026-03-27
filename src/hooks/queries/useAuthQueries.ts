import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { getLogoutAPI } from '../../api/authAPI'

function useLogout(
  options?: Omit<UseMutationOptions, 'mutationKey' | 'mutationFn'>
) {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: getLogoutAPI,
    ...options,
  })
}

export { useLogout }
