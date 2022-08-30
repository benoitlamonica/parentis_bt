import React, { useEffect } from 'react'
import getToken from '../spotify/auth'

export default function Auth() {
  useEffect(() => {
    getToken()  
  } , [])
  return (
    <div />
  )
}