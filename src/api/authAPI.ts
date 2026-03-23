import type { GetAccessTokenResponse } from '../types/api-response-types/auth'
import { instance } from './instance'

async function getRefreshTokenAPI() {
  const response = await instance.post<GetAccessTokenResponse>(
    '/accounts/me/refresh'
  )
  return response.data
}

export { getRefreshTokenAPI }
