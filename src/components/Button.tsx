import React from 'react'
export default function Button({
  children,
  onClick,
  className = '',
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={
        'bg-slate-500 p-2 rounded-md text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-red-600 transition-colors font-light shadow-sm shadow-slate-900 disabled:cursor-not-allowed ' +
        className
      }
      onClick={onClick}
      disabled={!onClick || disabled}
    >
      {children}
    </button>
  )
}
