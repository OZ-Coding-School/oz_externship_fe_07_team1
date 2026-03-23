import { http, HttpResponse } from 'msw'
import type {
  GetAccessTokenErrorResponse,
  GetAccessTokenResponse,
} from '../../types/api-response-types/auth'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const getRefreshTokenMOCK =
  // JWT 토큰 재발급 API
  http.post(`${BASE_URL}/accounts/me/refresh`, () => {
    const successResponse: GetAccessTokenResponse = {
      access_token: 'temporary-token-value',
    }
    const error400Response: GetAccessTokenErrorResponse = {
      error_detail: {
        refresh_token: ['이 필드는 필수 항목입니다.'],
      },
    }
    const error403Response: GetAccessTokenErrorResponse = {
      error_detail: {
        detail: '로그인 세션이 만료되었습니다.',
      },
    }

    /* 리프레시 토큰 보유 ver. */
    return HttpResponse.json(successResponse, { status: 200 })

    /* 리프레시 토큰 미보유 ver. */
    // return HttpResponse.json(error400Response, { status: 400 })

    /* 리프레시 토큰 만료 ver. */
    // return HttpResponse.json(error403Response, { status: 403 })
  })

export { getRefreshTokenMOCK }
