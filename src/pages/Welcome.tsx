import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import AddPlayers from '../components/AddPlayers'
import Button from '../components/Button'
import { useApi, useRequestAccessToken } from '../spotify'
import { authCodeState, Playlist, playlistState, tokenState } from '../store'

export default function Welcome() {
  const [authCode, setAuth] = useRecoilState(authCodeState)
  const [token, setToken] = useRecoilState(tokenState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [readyToPlay, setReadyToPlay] = React.useState(false)
  const navigate = useNavigate()
  const $api = useApi()
  const playlistId = '6ctYnwYajYm1W6IA78uAdQ'

  useRequestAccessToken((data) => {
    console.log(data)
    setToken(data)
  })

  useEffect(() => {
    const authCodeGet = new URLSearchParams(document.location.search).get('code')
    setAuth(authCodeGet)
  } , [])

  useEffect(() => {
    if (token) {
      $api.get(`/playlists/${playlistId}/tracks`).then(({data}) => {
        setPlaylist(data.items.map(({track}: any) => ({url : track.external_urls.spotify, name: track.name} as Playlist)))
      })
    }
  }, [token])

  useEffect(() => {
    if (playlist && readyToPlay) {
      navigate('/game')
    }
  } , [playlist, readyToPlay])


        
  return (
    <div>
        Hey
      <strong>{authCode}</strong>
      <AddPlayers/>
      <Button onClick={() => setReadyToPlay(true)}>Play</Button>
    </div>
  )
}