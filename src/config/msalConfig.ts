// import { PublicClientApplication } from '@azure/msal-browser'
// import { reactive } from 'vue'

// // export const msalConfig = {
// //   auth: {
// //     clientId: 'c3cc7dbf-1b24-4b27-aac9-ea7c2e32ce73',
// //     authority: 'https://login.microsoftonline.com/779cbb84-e22b-4bda-9bb1-ac90f7daf3e3',
// //     redirectUri: window.location.origin,
// //     postLogoutRedirectUri: window.location.origin,
// //   },
// //   cache: {
// //     cacheLocation: 'sessionStorage',
// //     storeAuthStateInCookie: false,
// //   },
// // }

// const msalConfig = {
//   auth: {
//     clientId: 'c3cc7dbf-1b24-4b27-aac9-ea7c2e32ce73', // Replace with your client ID
//     authority: 'https://<YOUR_B2C_TENANT_NAME>.b2clogin.com/<YOUR_B2C_TENANT_NAME>.onmicrosoft.com/<YOUR_POLICY_NAME>',
//     redirectUri: window.location.origin,
//     knownAuthorities: ['<YOUR_B2C_TENANT_NAME>.b2clogin.com'],
//   },
//   cache: {
//     cacheLocation: 'localStorage', // This can be 'sessionStorage' or 'localStorage'
//     storeAuthStateInCookie: true,
//   },
// }
// export const graphScopes = {
//   scopes: ['user.read', 'openid', 'profile'],
// }

// export const state = reactive({
//   isAuthenticated: false,
//   user: {},
// })

// export const myMSALObject = new PublicClientApplication(msalConfig)
