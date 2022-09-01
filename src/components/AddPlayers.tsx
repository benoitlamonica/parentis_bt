import React from 'react'

import { useRecoilState } from 'recoil'

import { playersState } from '../store'
import { Player } from '../store'
import Button from './Button'
import Input from './Input'

export default function AddPlayers() {
  const [players, setPlayers] = useRecoilState(playersState)
  const [name, setName] = React.useState('')

  const addPlayer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (name) {
      setPlayers([...players, { name: name, score: 0 } as Player])
    }
    setName('')
  }

  const deletePlayer = (id: number) => {
    setPlayers(players.filter((player: Player, key: number) => key !== id))
  }

  const showPlayers = () => {
    if (players.length > 0)
      return (
        <div>
          Players :{' '}
          {players.map((player: Player, i: number) => (
            <strong
              className="flex items-center justify-between mb-4 bg-slate-50 w-52 px-2 py-1 text-blue-400 rounded-md shadow-slate-400 shadow-sm font-medium"
              key={i}
            >
              <span>{player.name}</span>
              <div className='px-2 ml-2 bg-slate-300 inline-block text-slate-900 cursor-pointer' onClick={() => deletePlayer(i)}>
                Delete
              </div>
            </strong>
          ))}
        </div>
      )

    return 'No players yet'
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const playerName = e.target.value
    setName(playerName)
  }

  return (
    <div className="p-5 text-white">
      <div className="mb-4">
        Add player :{' '}
        <div className="flex">
          <Input type="text" onInput={handleInputChange} value={name} />{' '}
          <Button onClick={addPlayer}>Add</Button>
        </div>
      </div>
      {showPlayers()}
    </div>
  )
}
