import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import AddPlayers from '../components/AddPlayers'
import Button from '../components/Button'
import { useApi, useRequestAccessToken } from '../spotify'
import {
  authCodeState,
  playersState,
  Playlist,
  playlistIdState,
  playlistState,
  tokenState,
} from '../store'
import SetPlaylist from '../components/SetPlaylist'

type ItemInfoTrack = {
  track: {
    external_urls: {
      spotify: string;
    };
    name: string;
  };
};

export default function Welcome() {
  const [authCode, setAuth] = useRecoilState(authCodeState)
  const [token, setToken] = useRecoilState(tokenState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  const [playlistId] = useRecoilState(playlistIdState)
  const [players] = useRecoilState(playersState)
  const [readyToPlay, setReadyToPlay] = React.useState(false)
  const navigate = useNavigate()
  const $api = useApi()

  useRequestAccessToken((data) => {
    setToken(data)
  })

  useEffect(() => {
    const authCodeGet = new URLSearchParams(document.location.search).get(
      'code'
    )
    setAuth(authCodeGet)
  }, [])

  useEffect(() => {
    if (token && playlistId) {
      $api.get(`/playlists/${playlistId}/tracks`).then(({ data }) => {
        setPlaylist(
          data.items.map(
            ({ track }: ItemInfoTrack) =>
              ({
                url: track.external_urls.spotify,
                name: track.name,
              } as Playlist)
          )
        )
      })
    }
  }, [token, playlistId])

  useEffect(() => {
    if (playlist && readyToPlay && players.length > 0) {
      navigate('/game')
      return
    }
    
    setReadyToPlay(false)
  }, [playlist, readyToPlay, players])

  return (
    <div className="bg-slate-700 p-5 text-white md:mx-auto md:rounded-md">
      <h1 className="text-5xl text-white font-light text-center my-4 uppercase">
        Blind Test
      </h1>
      <strong>{authCode}</strong>
      <AddPlayers />
      <SetPlaylist />
      <Button
        className="text-2xl mx-auto block text-white px-10 my-1 font-bold"
        onClick={() => setReadyToPlay(true)}
      >
        Play
      </Button>
    </div>
  )
}
