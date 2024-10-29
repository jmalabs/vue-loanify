import * as msal from '@azure/msal-browser'

const msalConfig = {
  auth: {
    clientId: 'c3cc7dbf-1b24-4b27-aac9-ea7c2e32ce73',
    authority: 'https://login.microsoftonline.com/779cbb84-e22b-4bda-9bb1-ac90f7daf3e3',
    redirectUri: window.location.origin,
    postLogoutUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}

export const msalInstance = new msal.PublicClientApplication(msalConfig)

export const initializeMsal = async () => {
  return await msalInstance.initialize()
}

export const login = async () => {
  const loginRequest = {
    scopes: ['openid', 'profile'],
  }

  try {
    console.log('Login initiated1')

    return await msalInstance.loginRedirect(loginRequest)
  } catch (error) {
    console.error('Login error:', error)
  }
}

export const logout = async () => {
  const logoutRequest = {
    postLogoutRedirectUri: window.location.origin +'/logout',
  }

  try {
    localStorage.clear()
    sessionStorage.clear()

    await msalInstance.logoutRedirect(logoutRequest)
    console.log('Logout successful')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

export const getAccount = async () => {
  const currentAccounts = await msalInstance.getAllAccounts()

  if (currentAccounts.length > 0) {
    return currentAccounts[0]
  }

  return null
}

export const isAuthenticated = async () => {
  const response = await msalInstance.handleRedirectPromise()
  const account = await getAccount()

  
  if (response || account) {
    return true
  }
}
