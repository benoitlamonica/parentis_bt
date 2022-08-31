import React from 'react'

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      className="p-2 text-lg font-light text-blue-600 rounded block"
      {...props}
    />
  )
}
