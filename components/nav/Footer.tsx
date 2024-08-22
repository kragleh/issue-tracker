import Link from 'next/link'
import React from 'react'

const Footer = ({ className }: { className?: string }) => {
  return (
    <div className={ className }>
      <Link href={'https://kragleh.com'} className={'text-xs text-center opacity-50'}>{ new Date().getFullYear() } © Issue Tracker</Link>
    </div>
    
  )
}

export default Footer