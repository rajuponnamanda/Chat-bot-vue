import { createAuth0 } from '@auth0/auth0-vue'

export const auth0 = createAuth0({
  domain: 'login-tst.snelstart.nl',
  clientId: 'xka09e4YDJxv2c448MEspQHSe2cnhleO',
  authorizationParams: {
    redirect_uri: window.location.origin
    // audience: 'https://dev-qlvesfqc.eu.auth0.com/api/v2/',
    // scope: 'openid profile email offline_access'
  },
  useRefreshTokens: true,
  cacheLocation: 'localstorage'
})

export const getAccessToken = async () => {
  const accessToken = await auth0.getAccessTokenSilently({})
  return accessToken
}
