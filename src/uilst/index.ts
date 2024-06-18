import axios, {
  type AxiosResponse,
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type Method
} from 'axios'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { Direction } from './enumeration'

const server: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 请求拦截器
server.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
server.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    const { response } = error
    const title = ref<string>('')
    if (response) {
      switch (response.status) {
        case Direction.Fourhundredandone:
          title.value = '登录失效，请重新登录'
          break
        case Direction.Fourhundredandfour:
          title.value = '请求资源不存在'
          break
        case Direction.Fivehundred:
          title.value = '服务器内部错误'
          break
        case Direction.Fourhundred:
          title.value = '请求参数错误'
          break
      }
      ElMessage({
        message: title.value,
        type: 'error',
        plain: true
      })
    }
    return Promise.reject(error)
  }
)
type requesttype<T = any> = {
  data: T
  msg: string
  code: number
}

const request = <T = any>(url: string, method: Method, data: Object) => {
  const setRouter = ref<string[]>([])
  if (setRouter.value.includes(url)) {
    return new Promise((rejects) => {
      rejects('请求被拦截')
    })
  }
  setRouter.value.push(url)
  console.log(setRouter.value, 'setRouter.value')

  return server
    .request<T, requesttype<T>>({
      url,
      method,
      [method.toLowerCase() === 'get' ? 'params' : 'data']: data
    })
    .finally(() => {
      setRouter.value.splice(setRouter.value.indexOf(url), 1)
    })
}

export const get = <T = any>(url: string, params: object) => {
  return request<T>(url, 'get', params)
}

export const post = <T = any>(url: string, data: object) => {
  return request<T>(url, 'post', data)
}

export const put = <T = any>(url: string, data: object) => {
  return request<T>(url, 'put', data)
}

export const del = <T = any>(url: string, data: object) => {
  return request<T>(url, 'delete', data)
}

export default request
