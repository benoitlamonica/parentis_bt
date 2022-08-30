import React, { useEffect } from 'react'
import getToken from './spotify/auth'

function App() {
  useEffect(() => {
    getToken()
    
  } , [])

  return (
    <div>
    </div>
  )
}

export default App
