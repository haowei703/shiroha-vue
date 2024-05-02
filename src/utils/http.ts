import request from './request'

interface RequestOptions {
  url: string
  headers?: Record<string, string>
  params?: Record<string, any>
  data?: any
}

interface GetArgs extends RequestOptions {
  params?: Record<string, any>
}

interface PostArgs extends RequestOptions {
  data?: any
}

const http = {
  get({ url, params = {}, headers = {} }: GetArgs) {
    const config = {
      method: 'GET' as const,
      url,
      params,
      headers
    }
    return request(config)
  },
  post({ url, data = {}, headers = {} }: PostArgs) {
    const config = {
      method: 'POST' as const,
      url,
      data,
      headers
    }
    return request(config)
  }
}

export default http
