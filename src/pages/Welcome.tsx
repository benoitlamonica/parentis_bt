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
  const [playlistOk, setPlaylistOk] = React.useState(false)
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

        setPlaylistOk(true)
        
      }).catch(() => {
        setPlaylistOk(false)
      })
    }
  }, [token, playlistId])

  useEffect(() => {
    if (playlistOk && playlist && readyToPlay && players.length > 0) {
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

      <SetPlaylist className="mt-2" />

      <Button
        className={`text-2xl mx-auto block text-white px-10 my-1 font-bold ${playlistOk ? 'bg-green-500' : 'bg-red-500'} transition-colors duration-200`}
        onClick={() => setReadyToPlay(true)}
        disabled={!playlistOk}
      >
        Jouer!
      </Button>

      <div className="text-center mt-2">
        {playlistOk ? (
          <div className="text-green-500">Playlist valide!</div>
        ) : (
          <div className="text-red-500">Playlist inconnue</div>
        )}
      </div>
    </div>
  )
}
