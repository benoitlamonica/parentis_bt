import React from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../store'
import Input from './Input'

export default function SetPlaylist({ className = ''}: { className?: string }) {
  const [playlist, setPlaylist] = useRecoilState(playlistIdState)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylist(e.target.value)
  }

  return ( 
    <div className={`flex flex-col gap-2 p-5 ${className}`}>
      <div>Playlist: </div>
      <Input value={playlist} onInput={handleInput} className='w-full' />
    </div>
  )
}
