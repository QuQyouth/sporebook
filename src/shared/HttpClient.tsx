import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

type PostConfig = Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> //增
type DeleteConfig = Omit<AxiosRequestConfig, 'params'> //删
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'> //改
type GetConfig = Omit<AxiosRequestConfig, 'url' | 'method' | 'params'> //查

export class HttpClient {
    instance: AxiosInstance
    constructor(baseURL: string){
        this.instance = axios.create({
            baseURL
        })
    }
    //定义一个对象Record<key, value>
    get<R = unknown>(url: string, query?: Record<string, string>, config?: GetConfig) {
        return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
      }
    post<R = unknown>(url:string, data?: Record<string, string>, config?: PostConfig){
        return this.instance.request<R>({...config, url, data, method: 'post'})
    }
    patch<R = unknown>(url:string, data?: Record<string, string>, config?: PatchConfig){
        return this.instance.request<R>({...config, url, data, method: 'patch'})
    }
    delete<R = unknown>(url:string, query?: Record<string, string>, config?: DeleteConfig){
        return this.instance.request<R>({...config, url, params: query, method: 'delete'})
    }
}

// 统一拦截处理
export const defaultHttpClient = new HttpClient('/api/v1')

defaultHttpClient.instance.interceptors.request.use((config) => {
    return config
})

defaultHttpClient.instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response) {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 429) {
          alert('你太频繁了')
        }
      }
      throw error
    }
  )