import React from 'react'
import logo from './assets/logo.svg'

function App() {
  return (
    <header className="App-header bg-slate-200">
      <img src={logo} className="w-52" alt="logo" />
      <p>
            Edit <code className='font-extralight text-black'>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
            Learn React
      </a>
    </header>
  )
}

export default App
