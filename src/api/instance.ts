import axios from 'axios'
import { MSW_BASE_URL } from '../constants/baseUrl'

export const instance = axios.create({
  baseURL: MSW_BASE_URL,
  withCredentials: true,
})
