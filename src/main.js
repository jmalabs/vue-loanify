/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
// import router from '@/router'
import '@/styles/styles.scss'
import '@core/scss/index.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import AccountSettings from '../src/pages/account-settings.vue'
import Application from '../src/pages/applications.vue'
import Debtors from '../src/pages/debtors.vue'


loadFonts()
const app = createApp(App)
app.use(vuetify)
app.use(createPinia())

const routes = [
  {
    name: 'index',
    path: '/',
    redirect: {name : 'applications'}
  },
  {
    name: 'account-settings',
    path: '/account-settings',
    component: AccountSettings,
  },
  {
    name: 'debtors',
    path: '/debtors',
    component: Debtors,
  },
  {
    name: 'applications',
    path: '/applications',
    component: Application,
  },
  {
    name: 'error',
    path: '/error',
    component: Application,
  },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})


app.use(router)
app.mount('#app')
