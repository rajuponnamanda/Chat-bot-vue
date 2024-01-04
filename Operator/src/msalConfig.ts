// msalConfig.ts

import { BrowserCacheLocation, PublicClientApplication } from '@azure/msal-browser'

export const msalConfig = {
  auth: {
    clientId: '24d3d1b8-9e59-45b1-8a2b-1f2a40e6158d',
    authority: 'https://login.microsoftonline.com/c8379813-1a03-43cb-84b7-4c6877883082',
    redirectUri: window.location.origin,
    postLogoutUri: window.location.origin
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false
  }
}

export const graphScopes = {
  scopes: ['openid', 'profile', 'email', 'User.Read', 'User.ReadBasic.All']
}

export const myMSALObj = new PublicClientApplication(msalConfig)
