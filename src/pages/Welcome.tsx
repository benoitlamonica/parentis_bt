import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import AddPlayers from '../components/AddPlayers'
import Button from '../components/Button'
import { useApi, useRequestAccessToken } from '../spotify'
import { playlistId } from '../static'
import { authCodeState, playersState, Playlist, playlistState, tokenState } from '../store'

type ItemInfoTrack = {
    track: {
        external_urls: {
            spotify: string
        },
        name: string,
    }
}

export default function Welcome() {
  const [authCode, setAuth] = useRecoilState(authCodeState)
  const [token, setToken] = useRecoilState(tokenState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [players] = useRecoilState(playersState)
  const [readyToPlay, setReadyToPlay] = React.useState(false)
  const navigate = useNavigate()
  const $api = useApi()

  useRequestAccessToken((data) => {
    setToken(data)
  })

  useEffect(() => {
    const authCodeGet = new URLSearchParams(document.location.search).get('code')
    setAuth(authCodeGet)
  } , [])

  useEffect(() => {
    if (token) {
      $api.get(`/playlists/${playlistId}/tracks`).then(({data}) => {
        setPlaylist(data.items.map(({track}: ItemInfoTrack) => ({url : track.external_urls.spotify, name: track.name} as Playlist)))
      })
    }
  }, [token])

  useEffect(() => {
    if (playlist && readyToPlay && players.length > 0) {
      navigate('/game')
    }
  } , [playlist, readyToPlay, players])


        
  return (
    <div>
      <h1 className='font-bold text-3xl text-blue-600 text-center m-6'>Blind Test</h1>
      <strong>{authCode}</strong>
      <AddPlayers/>
      <Button className = 'text-2xl font-bold mx-auto block text-white px-10 py-5 my-10' onClick={() => setReadyToPlay(true)}>Play</Button>
    </div>
  )
}