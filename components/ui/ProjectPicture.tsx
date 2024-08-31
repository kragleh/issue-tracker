import { Project } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

const ProjectPicture = ({ project, size, className }: { project: Project, size?: number, className?: string }) => {
  if (project.icon) return (
    <Image alt={'pfp'} height={ 128 } width={ 128 }  src={ project.icon } className={'rounded-full ' + className } style={{ width: (size ? size : 16) + 'px', height: (size ? size : 16) + 'px' }} />
  )

  return (
    <div className={'bg-neutral-500 rounded-full flex items-center justify-center ' + className } style={{ width: (size ? size : 16) + 'px', height: (size ? size : 16) + 'px' }} >
      { project.title.charAt(0).toUpperCase() }
    </div>
  )
}

export default ProjectPicture