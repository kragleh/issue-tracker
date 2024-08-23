import { Project } from '@prisma/client'
import React from 'react'
import SidebarGroup from '../SidebarGroup'
import SidebarButton from '../SidebarButton'
import { FaPlus } from 'react-icons/fa'
import ProjectPicture from '@/components/misc/ProjectPicture'

const ProjectsSidebarGroup = ({ projects }: { projects: Project[] }) => {
  return (
    <SidebarGroup title='Projects'>
      {
        projects && projects.map(project => (
          <SidebarButton key={project.id} icon={ <ProjectPicture project={ project } size={ 24 } /> } title={ project.title } href={ `/project/${ project.id }` } />
        ))
      }
      <SidebarButton icon={ <FaPlus size={ 24 } /> } title='New Project' href='/project/new' />
    </SidebarGroup>
  )
}

export default ProjectsSidebarGroup