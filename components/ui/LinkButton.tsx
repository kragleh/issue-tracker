import Link from 'next/link'
import React from 'react'

export enum LinkButtonVariant {
  SUCCESS,
  DANGER,
  WARNING
}

const LinkButton = ({ children, className, onCLick, variant, href }: { children: React.ReactNode, className?: string, onCLick?: () => void, variant?: LinkButtonVariant, href: string }) => {
  if (variant === LinkButtonVariant.SUCCESS) {
    className += ' bg-green-500/20 hover:bg-green-500/30'
  } else if (variant === LinkButtonVariant.DANGER) {
    className += ' bg-red-500/20 hover:bg-red-500/30'
  } else if (variant === LinkButtonVariant.WARNING) {
    className += ' bg-yellow-500/20 hover:bg-yellow-500/30'
  } else {
    className += ' bg-neutral-500/20 hover:bg-neutral-500/30'
  }

  return (
    <Link href={ href } className={`text-neutral-700 dark:text-neutral-300 duration-200 text-center py-1 px-2 rounded ` + className} onClick={ onCLick }>
      { children }
    </Link>
  )
}

export default LinkButton