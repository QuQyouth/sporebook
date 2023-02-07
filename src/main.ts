import { createApp } from 'vue'
import { App } from './App'
import {createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history'
import '@svgstore'
import './mock'
import { createPinia } from 'pinia'

const router = createRouter({
  history,
  routes, 
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
