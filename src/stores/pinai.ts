import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getLogin } from '@/api'
import type { EmptyObject, requestEmptyObject } from '@/api/login'

export const usepinia = defineStore('mina', () => {
  const token = ref<string>('')
  const usetoken = (value: string) => {
    token.value = value
  }
  // 登录
  const Uselogin = async (value: requestEmptyObject) => {
    try {
      const res = await getLogin(value)
      return res
    } catch (error) {
      console.log(error)
    }
  }
  return {
    token,
    usetoken,
    Uselogin
  }
})
