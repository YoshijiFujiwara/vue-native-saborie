import axios from 'axios'
import { AsyncStorage, Platform } from 'react-native'

let BASE_URL
// eslint-disable-next-line no-undef
if (__DEV__) {
  BASE_URL = Platform.OS === 'ios' ? 'http://localhost:8000/api/v1' : 'http://10.0.2.2:8000/api/v1'
} else {
  BASE_URL = 'http://hogehoge/api/v1'
}

const axiosInstance = axios.create({
  timeout: 3000, // 3秒であきらめよう
  baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(async function (config) {
  const token = await AsyncStorage.getItem('saborie-jwt')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

export default axiosInstance
