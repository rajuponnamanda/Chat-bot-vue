import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { io } from 'socket.io-client'
const app = createApp(App)
const socket = io('http://localhost:3000')
app.provide('socket', socket)
const pinia = createPinia()
app.use(pinia)

app.use(router)

app.mount('#app')
