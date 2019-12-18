
import axios, { AxiosRequestConfig } from 'axios'
import { API } from '@/api/api'

export const HTTP = axios.create({
  baseURL:'/api',
  withCredentials: true,
  timeout: 10000
})

HTTP.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return error
  }
)

HTTP.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return error
  }
)

const getUrl = (url: string) => {
  if (API[url]) {
    return API[url]
  } else {
    return ''
  }
}

export const Get = (url: string, config: AxiosRequestConfig = {}) => {
  if (!config.headers) {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return HTTP.get(getUrl(url), config)
}

export const GetFile = (url: string, config: AxiosRequestConfig = {}) => {
  // config.responseType = 'arraybuffer'
  // config.responseType = 'blob'
  return HTTP.get(getUrl(url), config)
}

export const Post = (url: string, params = {}, config = {}) => {
  return HTTP.post(getUrl(url), params, config)
}
