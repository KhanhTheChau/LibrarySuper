import axios from 'axios'
import Cookies from 'vue-cookies'
import AuthServiceApi from '../services/auth.service'

const commonConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}
export default (baseURL) => {
  const axiosInstance = axios.create({
    baseURL,
    ...commonConfig
  })
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        alert('Your session has expired. Please log in again.')
        AuthServiceApi.signOut()
      } else {
        console.log('Error', error)
      }
      return Promise.reject(error)
    }
  )
  return axiosInstance
}
