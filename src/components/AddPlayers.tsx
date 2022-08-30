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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const playerName = e.target.value
    setName(playerName)
  }

  return (
    <div className=' bg-blue-600 p-5 text-white mx-10 rounded-md'>
      <div>
        Add player : <Input type="text" onInput={handleInputChange} value={name} /> <Button onClick={addPlayer}>Add</Button>
      </div>
      <div>
        Players : {players.map((player: Player, i: number) => <strong className="block my-4 bg-slate-50 w-fit px-4 text-blue-600" key={i}>{player.name}</strong>)}
      </div>
    </div>
  )
}