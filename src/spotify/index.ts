import axios from 'axios'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { authCodeState, tokenState } from '../store'

export const $credentials = {
  client_id: '5ef14437e8f44f5b98f0e2e53ca88c8e',
  client_secret: '0d77bc4be9184b108f1f5f680a4e5ef7',
} 

export function useRequestAccessToken(callback: (data: any) => void) {
  const [authCode, setAuth] = useRecoilState(authCodeState)

  const url = 'https://accounts.spotify.com/api/token'
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    redirect_uri: 'http://localhost:3000/callback',
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