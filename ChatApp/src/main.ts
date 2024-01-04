import './assets/main.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// // import 'bootstrap/dist/js/bootstrap.min.js'

// import 'bootstrap-icons/font/bootstrap-icons.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { auth0 } from './auth0Config'
import io from 'socket.io-client';

// const socket = io('http://localhost:3000');
const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
// app.provide('socket', socket);
// socket.connect();
// socket.disconnect()
app.use(router)
app.use(auth0)
app.mount('#app')
