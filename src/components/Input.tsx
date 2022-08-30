import React from 'react'

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className=' p-1 text-lg font-light text-blue-600' {...props}/>
  )
}