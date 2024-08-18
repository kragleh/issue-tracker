import { Project } from '@prisma/client'
import React from 'react'
import ProjectPicture from '../misc/ProjectPicture'
import ProjectHeaderButton from './ProjectHeaderButton'

const ProjectHeader = ({ project }: { project: Project }) => {
  return (
    <section className='flex gap-2 p-4 justify-between border-b border-neutral-300 dark:border-neutral-700'>
      <div className='flex gap-2 items-center'>
        <ProjectPicture project={ project } size={ 32 } />
        <h1 className='text-2xl'>{ project.title }</h1>
      </div>
      <div className='flex gap-2 items-center'>
        <ProjectHeaderButton title='Settings' href={'/project/' + project.id + '/settings'} />
      </div>
    </section>
  )
}

export default ProjectHeader