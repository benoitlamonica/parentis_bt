import React from 'react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import Button from '../components/Button'
import Track from '../components/Track'
import { Player, playersState, Playlist, playlistState } from '../store'

export default function Game() {
  const [playlist] = useRecoilState(playlistState)
  const [players, setPlayers] = useRecoilState(playersState)
  const [choosenTrack, setChoosenTrack] = React.useState<Playlist | null>(null)
  const [pointAdded, setPointAdded] = React.useState(0)
  const [alreadyChoosenTracks, setAlreadyChoosenTracks] = React.useState<Playlist[]>([])

  const addPoint = (id: number) => {
    const newPlayers = players.map((player: Player, key: number) => {
      if (key === id) {
        return { ...player, score: player.score + 1 }
      }

      return player
    })
    setPointAdded(pointAdded + 1)
    setPlayers(newPlayers)
  }

  const changeTrack = () => {
    setChoosenTrack(playlist[Math.floor(Math.random() * playlist.length)])
  }

  useEffect(() => {
    changeTrack()
  }, [])

  useEffect(() => {
    if(pointAdded === 2) {
      setPointAdded(0)
      changeTrack()
    }
  }, [pointAdded])

  return (
    <div className='m-4 p-8 bg-blue-100 shadow-md shadow-blue-600 rounded-xl'>
      <h1 className='text-3xl font-bold text-center mb-8'>Blind Test</h1>
      {choosenTrack ? <Track url={choosenTrack.url} /> : <strong>Loading your track</strong>}
      <div className="grid grid-cols-2 m-8">
        <div>
          <strong className='block text-center'>Titre</strong>
          <div className='flex flex-row gap-2 m-4 justify-center'>
            {players.map(({name}: Player, id: number) => (
              <div key={name}>
                <Button onClick={() => addPoint(id)}>{name}</Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <strong className='block text-center'>Artiste</strong>
          <div className='flex flex-row gap-2 m-4 justify-center'>
            {players.map(({name}: Player, id: number) => (
              <div key={name}>
                <Button onClick={() => addPoint(id)}>{name}</Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-8  mx-auto w-fit'>
        <Button onClick={changeTrack}>Change track</Button>
      </div>

      <div className='grid grid-cols-2 w-1/2 mx-auto gap-2'>
        {players.map(({name, score}: Player, id: number) => (
          <div key={name} className='bg-blue-600 text-white p-4'>
            <strong>{name}</strong> : {score}
          </div>
        ))}
      </div>
    </div>
  )
}