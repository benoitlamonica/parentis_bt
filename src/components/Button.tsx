import React from 'react'
export default function Button({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
}) {
  return (
    <button
      className={
        'bg-slate-500 p-2 rounded-md text-white hover:bg-blue-500 transition-colors font-light shadow-sm shadow-slate-900 ' +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}
