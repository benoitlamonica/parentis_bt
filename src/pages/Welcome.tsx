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
  const playlistId = '2IamgqJjhiz48fBY9W0kpa'

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
      <h1 className='font-bold text-3xl text-blue-600 text-center m-6'>Blind Test</h1>
      <strong>{authCode}</strong>
      <AddPlayers/>
      <Button className = 'text-2xl font-bold mx-auto block text-white px-10 py-5 my-10' onClick={() => setReadyToPlay(true)}>Play</Button>
    </div>
  )
}