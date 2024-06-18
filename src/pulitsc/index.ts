// 储存所有的export default logte

import type { App } from 'vue'
type meatchtype = {
  default: (app: App) => void
}
type meatchtypeSET = Record<string, meatchtype>
export const pusliindex = (app: App) => {
  const meatch: meatchtypeSET = import.meta.glob('./*ts', { eager: true })
  for (const key in meatch) {
    if (typeof meatch[key].default === 'function') {
      if (key !== 'index.ts') {
        meatch[key].default(app)
      }
    }
  }
}
