import React from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from './routes'

export default function RouteList() {
  return (
    <Routes>
      {routes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  )
}