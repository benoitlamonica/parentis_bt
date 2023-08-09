import React from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../store'
import Input from './Input'

export default function SetPlaylist() {
  const [playlist, setPlaylist] = useRecoilState(playlistIdState)

  return ( 
    <div className='flex items-center gap-2 justify-center'>
      <div>Playlist: </div>
      <Input value={playlist} onChange={setPlaylist} />
    </div>
  )
}
