import React from 'react'
import { Routes, Route } from 'react-router-dom'
import routes from './routes'

export default function RouteList() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-2 sm:px-5 bg-slate-500">
      <div className='bg-slate-100 w-full sm:w-fit sm:min-w-[50%] py-10 border-4 border-slate-200 shadow-lg shadow-slate-600 rounded'>
        <Routes>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Routes>
      </div>
    </div>
  )
}