

import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { defaultHttpClient } from '../shared/HttpClient'


// 防止跨请求状态污染

type MeState = {
  id: string,
  email: string,
  token: string
}
type MeActions = {
  login: (userData:UserFormData) => void,
  logout: ()=>void
}
export const useMeStore = defineStore<string, MeState, {}, MeActions>('user', {
  state: () => ({
    id: "",
    email: "",
    token: ""
  }),
  actions: {
    async login(userData:UserFormData){
      const result:any = await defaultHttpClient.post('/session', userData)
      const {codeSign, id, token} = result.data
      if(codeSign === 0){
        this.id = id
        this.email = userData.email
        this.token = token
      }
      return result
    },

    logout(){
      this.id = '',
      this.email = '',
      this.token = ''
    }
  }
})
