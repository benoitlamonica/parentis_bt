import axios from 'axios'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { authCodeState, tokenState } from '../store'

type AccessToken = {
  access_token: string,
  token_type: string,
  scope: string,
  expires_in: number,
  refresh_token: string,
}

export const $credentials = {
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID as string,
  client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET as string,
} 

export function useRequestAccessToken(callback: (data: AccessToken) => void) {
  const [authCode, setAuth] = useRecoilState(authCodeState)

  const url = 'https://accounts.spotify.com/api/token'
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: 'https://parentis-bt.netlify.app/callback',
    client_id: $credentials.client_id,
    code_verifier: localStorage.getItem('codeVerifier') as string,
  })

  useEffect( () => {
    if (authCode) {
      setAuth('')
      axios.post(url, params, {
        headers: {
          'Authorization': `Basic ${btoa($credentials.client_id + ':' + $credentials.client_secret)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(({ data }) => {
          callback(data)
        }).catch(() => {
          //
        }
        )
    }
  }, [authCode])
}

export function useApi() {
  const [token] = useRecoilState(tokenState)
  return axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    headers: {
      'Authorization': `Bearer ${token.access_token}`,
    }
  })
}