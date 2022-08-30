import React from 'react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Track from '../components/Track'
import { Playlist, playlistState } from '../store'

export default function Game() {
  const [playlist] = useRecoilState(playlistState)
  const [choosenTrack, setChoosenTrack] = React.useState<Playlist | null>(null)
  const [alreadyChoosenTracks, setAlreadyChoosenTracks] = React.useState<Playlist[]>([])

  useEffect(() => {
    setChoosenTrack(playlist[Math.floor(Math.random() * playlist.length)])
  }, [])

  return (
    <div className=''>
      {choosenTrack ? <Track url={choosenTrack.url} /> : <strong>Loading your track</strong>}
    </div>
  )
}