import Link from 'next/link'
import React from 'react'

const ProjectHeaderButton = ({ title, href }: { title: string, href: string }) => {
  return (
    <Link href={ href } className='
      flex items-center gap-2 
      text-neutral-700 dark:text-neutral-300 
      bg-neutral-200 hover:bg-neutral-300 
      dark:bg-neutral-800 dark:hover:bg-neutral-700 
      duration-200 px-4 py-1 rounded-xl
    '>
      { title }
    </Link>
  )
}

export default ProjectHeaderButton