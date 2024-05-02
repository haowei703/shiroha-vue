import http from '@/utils/http'
import { AxiosError } from 'axios'

/**
 * 账号登录
 * @param options 参数对象
 * @param options.email 电子邮件
 * @param options.password 密码
 * @returns 返回 Promise
 */
export async function login(options: { email: string; password: string }): Promise<void> {
  try {
    await http.post({ url: '/auth/login', data: options })
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) throw Error('用户名或密码错误')
      if (error.response?.status === 500) throw Error('服务器内部错误')
    }
  }
}

/**
 * 账号注册
 * @param options 参数对象
 * @param options.email 电子邮件
 * @param options.code 验证码
 * @param options.password 密码
 * @returns 返回 Promise
 */
export async function register(options: {
  email: string
  code: number
  password: string
}): Promise<void> {
  try {
    await http.post({ url: '/auth/register', data: options })
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) throw Error('服务器内部错误')
    }
  }
}
