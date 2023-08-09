import { $credentials } from '.'

type ParamSpotApi = {
  response_type: string,
  client_id: string,
  scope: string,
  code_challenge_method: string,
  code_challenge: string,
  redirect_uri: string,
}
function generateUrlWithSearchParams(url: string, params: ParamSpotApi): (string | Location) & Location {
  const urlObject = new URL(url)
  urlObject.search = new URLSearchParams(params).toString()

  return urlObject.toString() as (string | Location) & Location
}

function generateRandomString(length: number) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  localStorage.setItem('codeVerifier', text)
  
  return text
}

async function generateCodeChallenge(codeVerifier: string) {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(codeVerifier),
  )
  
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

async function codeChallenge() {
  return await generateCodeChallenge(generateRandomString(128))
}

export default async function getToken() {
  const code_challenge = await codeChallenge()

  window.location = generateUrlWithSearchParams(
    'https://accounts.spotify.com/authorize',
    {
      response_type: 'code',
      client_id: $credentials.client_id,
      scope: 'user-read-private user-read-email',
      code_challenge_method: 'S256',
      code_challenge,
      redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI as string,
    },
  )
}
