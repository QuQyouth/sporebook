import { createApp } from 'vue'
import { App } from './App'
import {createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'
import '@svgstore'
import './mock'
import { createPinia } from 'pinia'
import { useMeStore } from './stores/useMeStore'



const router = createRouter({
  history,
  routes, 
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

// pinia挂载之后调用
const currentStore = useMeStore()

router.beforeEach(async (to, from) => {
  
  if (
    // 检查用户是否已登录
    !currentStore.token &&
    // 避免无限重定向
    to.name !== 'SignIn'
  ) {
    if (from.name === undefined) {return}
    if((from.name as string).includes('come')) {return}

    // 将用户重定向到登录页面
    return { name: 'SignIn' }
  }
  
})
