import React from 'react'

const CardLayout = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <section className={`
      bg-neutral-100 dark:bg-neutral-900 
      border border-neutral-300 dark:border-neutral-700 
      rounded-xl ${className}
    `}>
      { children }
    </section>
  )
}

export default CardLayout