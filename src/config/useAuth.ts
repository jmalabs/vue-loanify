// // useAuth.ts

// import { myMSALObject, state } from './msalConfig'

// let interactionInProgress = false // Flag to track interaction state

// export function useAuth() {
//   //   const login = async () => {
//   //     // if (interactionInProgress) {
//   //     //   console.log('Interaction already in progress. Please wait.')

//   //     //   return // Prevent further execution if interaction is in progress
//   //     // }

//   //     interactionInProgress = true // Set the flag

//   //     try {
//   //       if (!myMSALObject) {
//   //         throw new Error('MSAL object is not initialized')
//   //       }

//   //       await myMSALObject.loginRedirect()
//   //       state.isAuthenticated = true

//   //       console.log('Login successful')
//   //     } catch (error) {
//   //       console.log('Login failed:', error)
//   //     } finally {
//   //       interactionInProgress = false // Reset the flag
//   //     }
//   //   }

//   const login = async () => {
//     const loginRequest = {
//       scopes: ['openid', 'profile'], // Define scopes as needed
//     }
//     try {
//       return await myMSALObject.loginRedirect(loginRequest)
//     } catch (error) {
//       console.error('Login error:', error)
//     }
//   }

//   const handleRedirect = async () => {
//     try {
//       await myMSALObject.handleRedirectPromise()
//       state.isAuthenticated = myMSALObject.getAllAccounts().length > 0
//       state.user = myMSALObject.getAllAccounts()[0]
//     } catch (error) {
//       console.error('Redirect error:', error)
//     }
//   }

//   const logout = () => {
//     if (!myMSALObject) {
//       throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
//     }

//     myMSALObject.logoutRedirect()
//     state.isAuthenticated = false
//     state.user = null
//   }

//   return { login, logout, handleRedirect }
// }
