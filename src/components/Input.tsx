import React from 'react'

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }
) {
  return (
    <input
      {...props}
      className={`p-2 text-lg font-light text-blue-600 rounded block ${props.className}`}
    />
  )
}
