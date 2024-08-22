"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ProjectIssuesButton = () => {
  const id = usePathname().replace('/project/', '')

  return (
    <Link href={`/project/${ id }/issues`} className='
      w-full flex items-center gap-2 
      text-neutral-700 dark:text-neutral-300 
      duration-200
    '>
      Issues
    </Link>
  )
}

export default ProjectIssuesButton