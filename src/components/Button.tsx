import React from 'react'
export default function Button({ children, onClick } : { children: React.ReactNode, onClick?: React.MouseEventHandler }) {
  return (<button className=" bg-blue-300 p-2 rounded-md text-white" onClick={onClick}>{children}</button>)
}