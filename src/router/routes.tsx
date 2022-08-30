import Welcome from '../pages/Welcome'
import React from 'react'
import Game from '../pages/Game'
import Auth from '../pages/Auth'

export type Route = {
    path: string,
    component: React.ReactNode,
    name: string,
}

export default [
  {
    path: '/',
    component: <Auth />,
    name: 'Home',
  },
  {
    path: '/callback',
    component: <Welcome />,
    name: 'Index',
  },
  {
    path: '/game',
    component: <Game />,
    name: 'Game',
  }
] as Route[]