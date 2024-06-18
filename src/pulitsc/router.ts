import router from '@/router'
import type { App } from 'vue'
const load = (app: App) => {
  app.use(router)
}
export default load
