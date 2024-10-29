import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

import authRoutes from './routes/authRoute'

console.log('authRoutes:!!! ', authRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...setupLayouts(routes) ],
  scrollBehavior() {
    return { top: 0 }
  },
})
export default router
