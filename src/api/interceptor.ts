import { useAccessTokenStore } from '../store/useAccessTokenStore'
import { getRefreshTokenAPI } from './authAPI'
import { instance } from './instance'
import { apiInstance } from './apiInstance'

const instances = [instance, apiInstance]

instances.forEach((targetInstance) => {
  targetInstance.interceptors.request.use((config) => {
    const { accessToken } = useAccessTokenStore.getState()

    if (!accessToken) return config

    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  })

  targetInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      const { accessToken, setAccessToken, clearAccessToken } =
        useAccessTokenStore.getState()

      if (error.response?.status !== 401) {
        return Promise.reject(error)
      }

      if (
        !accessToken ||
        accessToken === 'null' ||
        accessToken === 'undefined' ||
        accessToken.trim() === ''
      ) {
        return Promise.reject(error)
      }

      if (originalRequest?._retry) {
        clearAccessToken()
        return Promise.reject(error)
      }
      originalRequest._retry = true

      if (originalRequest.url?.includes('accounts/me/refresh')) {
        clearAccessToken()
        window.location.href = 'https://my.ozcodingschool.site/login'
        return Promise.reject(error)
      }

      try {
        const { access_token: newAccessToken } = await getRefreshTokenAPI()

        const { accessToken: currentToken } = useAccessTokenStore.getState()

        if (!currentToken) {
          return Promise.reject(error)
        }

        setAccessToken(newAccessToken)

        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return targetInstance(originalRequest)
      } catch (refreshError) {
        clearAccessToken()
        return Promise.reject(error)
      }
    }
  )
})
