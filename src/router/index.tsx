import React from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from './routes'

export default function RouteList() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-2 md:px-5 bg-slate-500">
      <div className='bg-slate-600 w-full md:w-fit md:min-w-[50%] shadow-lg shadow-slate-600 rounded-xl overflow-hidden'>
        <Routes>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Routes>
      </div>
    </div>
  )
}