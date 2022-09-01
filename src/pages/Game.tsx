import React, { useMemo } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

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

  const resetGame = () => {
    setPlayers(players.map((player: Player) => ({ ...player, score: 0 })))
    changeTrack()
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
    <div className="flex flex-col-reverse items-center justify-center md:flex-row">
      <div className="mx-auto w-full text-white md:w-1/3">
        <div className="mt-2 text-center font-light uppercase md:mt-0 md:mb-4">
          Scores
        </div>
        <div className="mx-auto grid grid-cols-1 gap-1 px-2 py-2 md:gap-2 md:px-4">
          {filteredPlayers.map(({ name, score }: Player) => (
            <div
              key={name}
              className="w-full bg-slate-500 p-2 font-light text-slate-800 md:shadow-slate-900 rounded-sm md:rounded-md md:shadow-sm"
            >
              <strong className="text-white">{name} : </strong>{' '}
              <span className="font-extrabold text-blue-300">{score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-slate-700 p-4 md:mx-auto md:w-2/3">
        <h1 className="mb-8 text-center text-5xl font-light uppercase text-white">
          Blind Test
        </h1>
        {choosenTrack ? (
          <Track url={choosenTrack.url} />
        ) : (
          <strong>Loading your track</strong>
        )}
        <div className="grid-col-1 mt-8 grid md:grid-cols-2">
          <div className={isTitleShown ? 'block' : 'hidden'}>
            <strong className="block text-center text-white">Titre</strong>
            <div className="m-4 flex flex-row flex-wrap justify-center gap-2">
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
            <div className="m-4 flex flex-row flex-wrap justify-center gap-2">
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
        <div className="flex justify-center items-center gap-2 flex-wrap my-8  mx-auto w-fit">
          <Button onClick={changeTrack}>Change track</Button>
          <Button onClick={resetGame}>Reset</Button>
          <Button onClick={() => navigate('/callback')}>Change Players</Button>
        </div>
      </div>
    </div>
  )
}
