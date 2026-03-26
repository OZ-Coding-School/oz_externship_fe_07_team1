import type { GetUserInfoResponse } from '../types/api-response-types/user'
import { apiInstance } from './apiInstance'

async function getUserInfoAPI() {
  const response = await apiInstance.get<GetUserInfoResponse>('/accounts/me')
  return response.data
}

export { getUserInfoAPI }
