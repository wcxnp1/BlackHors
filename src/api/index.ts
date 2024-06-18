import request from '@/uilst/index'
import { type EmptyObject, type requestEmptyObject } from './login/index'
export const getLogin = (data: requestEmptyObject) => {
  return request('/park/login', 'post', data)
}
