import axios from 'axios'
import { BASE_URL } from './ApiEndpoints'
const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const excludedEndpoints = [
  '/login',
  '/register',
  '/status',
  '/activate',
  '/health',
]
//request interceptor to add JWT token to headers
axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludedEndpoints.some((endpoint) => {
      config.url?.includes(endpoint)
    })
    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem('token')
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

//response interceptor to handle 401 errors

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response

      switch (status) {
        case 401:
          window.location.href = '/login'
          break
        case 500:
          console.error('Server Error:', error.response.data)
          break
        default:
          console.warn(`Unhandled status code: ${status}`, error.response.data)
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request Timeout: The request took too long to respond.')
    } else if (error.request) {
      console.error('No response received:', error.message)
    } else {
      console.error('An unexpected error occurred:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosConfig
