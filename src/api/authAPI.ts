import type { GetAccessTokenResponse } from '../types/api-response-types/auth'
import { apiInstance } from './apiInstance'
import { instance } from './instance'

async function getRefreshTokenAPI() {
  const response = await instance.post<GetAccessTokenResponse>(
    '/accounts/me/refresh'
  )
  return response.data
}

async function getLogoutAPI() {
  const response = await apiInstance.post('accounts/logout')
  return response.data
}

export { getRefreshTokenAPI, getLogoutAPI }
