"use client"
import React from 'react'

export enum ButtonVariant {
  SUCCESS,
  DANGER,
  WARNING
}

const Button = ({ children, className, onClick, variant, disabled }: { children: React.ReactNode, className?: string, onClick?: () => void, variant?: ButtonVariant, disabled?: boolean }) => {
  if (disabled) {
    className += ' opacity-50 cursor-not-allowed'

    if (variant === ButtonVariant.SUCCESS) {
      className += ' bg-green-500/20'
    } else if (variant === ButtonVariant.DANGER) {
      className += ' bg-red-500/20'
    } else if (variant === ButtonVariant.WARNING) {
      className += ' bg-yellow-500/20'
    } else {
      className += ' bg-neutral-500/20'
    }
  } else {
    if (variant === ButtonVariant.SUCCESS) {
      className += ' bg-green-500/20 hover:bg-green-500/30'
    } else if (variant === ButtonVariant.DANGER) {
      className += ' bg-red-500/20 hover:bg-red-500/30'
    } else if (variant === ButtonVariant.WARNING) {
      className += ' bg-yellow-500/20 hover:bg-yellow-500/30'
    } else {
      className += ' bg-neutral-500/20 hover:bg-neutral-500/30'
    }
  }

  return (
    <button className={`text-neutral-700 dark:text-neutral-300 duration-200 text-center py-1 rounded ` + className} onClick={ disabled ? undefined : onClick }>
      { children }
    </button>
  )
}

export default Button