import { useAccessTokenStore } from '../store/useAccessTokenStore'
import { getRefreshTokenAPI } from './authAPI'
import { instance } from './instance'

instance.interceptors.request.use((config) => {
  const { accessToken } = useAccessTokenStore()

  if (accessToken) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const { accessToken, setAccessToken, clearAccessToken } =
      useAccessTokenStore()

    // 401 에러가 아니면 그대로 에러 처리 진행
    if (error.response?.status !== 401) {
      return Promise.reject(error)
    }

    // 이미 한번 시도한 요청이면 종료 (무한 루프 방지)
    if (originalRequest?._retry) {
      clearAccessToken()
      return Promise.reject(error)
    }
    originalRequest._retry = true

    // 토큰 재발급 요청에서 에러(리프레시 토큰 만료) 발생하면 리다이렉트
    if (originalRequest.url?.includes('accounts/me/refresh')) {
      clearAccessToken()
      window.location.href = 'https://my.ozcodingschool.site/login'
      return Promise.reject(error)
    }

    // 401 에러 발생 시 토큰 재발급 시도
    try {
      const { access_token: newAccessToken } = await getRefreshTokenAPI()
      setAccessToken(newAccessToken)

      originalRequest.headers = originalRequest.headers ?? {}
      originalRequest.headers.Authorization = `Bearer ${accessToken}`

      return instance(originalRequest)
    } catch (refreshError) {
      clearAccessToken()
      return Promise.reject(error)
    }
  }
)
