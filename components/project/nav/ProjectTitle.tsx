import ProjectPicture from '@/components/misc/ProjectPicture'
import { Project } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const ProjectTitle = ({ project }: { project: Project }) => {
  return (
    <Link href={'/project/' + project.id} className='flex gap-2 items-center'>
      <ProjectPicture project={ project } size={ 32 } />
      <h1>{ project.title }</h1>
    </Link>
  )
}

export default ProjectTitle