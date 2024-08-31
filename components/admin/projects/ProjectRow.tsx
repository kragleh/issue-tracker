import ProjectPicture from '@/components/ui/ProjectPicture'
import LinkButton from '@/components/ui/LinkButton'
import { Project } from '@prisma/client'
import React from 'react'

const ProjectRow = ({ project }: { project: Project }) => {
  return (
    <div className='
      flex justify-between items-center
      even:bg-black/20 dark:even:bg-white/20
      p-2
    '>
      <div className='flex gap-2 items-center'>
        <ProjectPicture project={ project } size={ 24 } />
        <p>{ project.title }</p>
      </div>
      <div className='flex gap-2 items-center'>
        <LinkButton href={`/admin/projects/${project.id}`} className='px-2'>
          View
        </LinkButton>
      </div>
    </div>
  )
}

export default ProjectRow