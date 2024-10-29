import LogoutRedirect from '../../components/Auth/LogoutRedirect.vue'

const routes = [
  {
    name: 'LogoutRedirect ',
    path: '/logout',
    component: LogoutRedirect,
    meta: { hideNav: true },
  },

  // other routes...
]

export default routes
