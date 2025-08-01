import './assets/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'

const app=createApp(App)
app.use(Toast, {
  position: 'bottom-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
});
app.mount('#app')
