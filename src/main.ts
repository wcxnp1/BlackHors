import { createApp } from 'vue'

import App from './App.vue'
import '@/style/index.scss'
import 'normalize.css'
import { pusliindex } from '@/pulitsc/index'
const app = createApp(App)

pusliindex(app)
app.mount('#app') 
