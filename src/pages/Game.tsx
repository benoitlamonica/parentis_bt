import React, { useMemo } from 'react'
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
  const [isTitleShown, setIsTitleShown] = React.useState(true)
  const [isArtistShown, setIsArtistShown] = React.useState(true)

  const filteredPlayers = useMemo(() => {
    return [...players].sort((a: Player, b: Player) => b.score - a.score)
  }, [players])

  // To do
  // const [alreadyChoosenTracks, setAlreadyChoosenTracks] = React.useState<Playlist[]>([])

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
    setPointAdded(0)
    setIsArtistShown(true)
    setIsTitleShown(true)
    setChoosenTrack(playlist[Math.floor(Math.random() * playlist.length)])
  }

  useEffect(() => {
    changeTrack()
  }, [])

  useEffect(() => {
    if (pointAdded === 2) {
      changeTrack()
    }
  }, [pointAdded])

  return (
    <div className="p-4 sm:mx-auto sm:w-1/2 bg-blue-400 shadow-md shadow-blue-600 sm:rounded-xl">
      <h1 className="text-5xl font-light text-center mb-8 text-white uppercase">
        Blind Test
      </h1>

      {choosenTrack ? (
        <Track url={choosenTrack.url} />
      ) : (
        <strong>Loading your track</strong>
      )}

      <div className="grid grid-col-1 sm:grid-cols-2 mt-8">
        <div className={isTitleShown ? 'block' : 'hidden'}>
          <strong className="block text-center text-white">Titre</strong>
          <div className="flex flex-row gap-2 m-4 justify-center">
            {players.map(({ name }: Player, id: number) => (
              <div key={name}>
                <Button
                  onClick={() => {
                    addPoint(id)
                    setIsTitleShown(false)
                  }}
                >
                  {name}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className={isArtistShown ? 'block' : 'hidden'}>
          <strong className="block text-center text-white">Artiste</strong>
          <div className="flex flex-row gap-2 m-4 justify-center">
            {players.map(({ name }: Player, id: number) => (
              <div key={name}>
                <Button
                  onClick={() => {
                    addPoint(id)
                    setIsArtistShown(false)
                  }}
                >
                  {name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-8  mx-auto w-fit">
        <Button onClick={changeTrack}>Change track</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 w-1/2 mx-auto gap-2">
        {filteredPlayers.map(({ name, score }: Player) => (
          <div key={name} className="bg-blue-600 text-white p-4">
            <strong>{name}</strong> : {score}
          </div>
        ))}
      </div>
    </div>
  )
}
