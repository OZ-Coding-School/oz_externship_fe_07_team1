import axios from 'axios'
import { API_BASE_URL } from '../constants/baseUrl'

export const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

apiInstance.interceptors.request.use(
  (config) => {
    const token =
      import.meta.env.VITE_TEMPORARY_ACCESS_TOKEN ||
      localStorage.getItem('accessToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
