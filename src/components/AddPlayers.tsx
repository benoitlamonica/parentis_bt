import React from 'react'

import { useRecoilState } from 'recoil'

import { playersState } from '../store'
import { Player } from '../store'
import Button from './Button'

export default function AddPlayers() {
  const [players, setPlayers] = useRecoilState(playersState)
  const [name, setName] = React.useState('')

  const addPlayer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setPlayers([...players, { name: name, score: 0 } as Player])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const playerName = e.target.value
    setName(playerName)
  }

  return (
    <>
      <div>
        Add player : <input type="text" onInput={handleInputChange} /> <Button onClick={addPlayer}>Add</Button>
      </div>
      <div>
        Players : {players.map((player: Player, i: number) => <strong className="block m-1 bg-slate-200 w-fit" key={i}>{player.name}</strong>)}
      </div>
    </>
  )
}