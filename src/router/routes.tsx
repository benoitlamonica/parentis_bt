import App from '../App'
import Welcome from '../pages/Welcome'
import React from 'react'
import Game from '../pages/Game'

export type Route = {
    path: string,
    component: React.ReactNode,
    name: string,
}

export default [
  {
    path: '/',
    component: <App/>,
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