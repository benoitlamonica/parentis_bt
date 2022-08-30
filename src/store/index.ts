import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export type Player = {
  name: string,
  score: number,
}

export type Playlist = {
  url: string,
  name: string,
}

export const playersState = atom({
  key: 'players',
  default: [] as Player[]|[],
  effects_UNSTABLE: [persistAtom],
})

export const authCodeState = atom({
  key: 'authCode',
  default: '',
  effects_UNSTABLE: [persistAtom],
})

export const tokenState = atom({
  key: 'token',
  default: '',
  effects_UNSTABLE: [persistAtom],
})

export const playlistState = atom({
  key: 'playlist',
  default: [] as Playlist[]|[],
  effects_UNSTABLE: [persistAtom],
})