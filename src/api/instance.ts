import axios from 'axios'
import { API_BASE_URL } from '../constants/baseUrl'

export const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})
