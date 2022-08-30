import React from 'react'
export default function Button({ children, onClick, className = '' } : { children: React.ReactNode, onClick?: React.MouseEventHandler, className?: string }) {
  return (<button className={'bg-blue-300 p-2 rounded-md text-white ' + className} onClick={onClick}>{children}</button>)
}