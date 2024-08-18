import React from 'react'

const CardLayout = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <section className={`
      bg-neutral-100 dark:bg-neutral-900 
      border-0 md:border border-neutral-300 dark:border-neutral-700 
      p-4 rounded-none md:rounded-2xl ${className}
      w-full md:max-w-sm 
      h-screen md:h-auto
      flex flex-col justify-center gap-4
    `}>
      { children }
    </section>
  )
}

export default CardLayout