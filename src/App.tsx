import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import RouteList from './router'

function App() {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <BrowserRouter>
          <RouteList/>
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
  )
}

export default App
