import React from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from './routes'

export default function RouteList() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className='bg-slate-100 w-full'>
        <Routes>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Routes>
      </div>
    </div>
  )
}