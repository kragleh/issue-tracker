import { auth } from '@/auth'
import SidebarHeaderLayout from '@/components/layout/SidebarHeaderLayout'
import AdminSidebarMenu from '@/components/nav/groups/AdminSidebarGroup'
import MenuSiderbarGroup from '@/components/nav/groups/MenuSiderbarGroup'
import ProjectsSidebarGroup from '@/components/nav/groups/ProjectsSidebarGroup'
import ProjectHeader from '@/components/project/nav/ProjectHeader'
import ProjectHeaderMenu from '@/components/project/nav/ProjectHeaderMenu'
import ProjectTitle from '@/components/project/nav/ProjectTitle'
import { db } from '@/lib/db'
import React from 'react'

const ProjectPageLayout = async ({ children, params }: { children: React.ReactNode, params: { id: string } }) => {
  const session = await auth()
  const user = session?.user
  if (!user) return (<>{ children }</>)

  const projects = await db.project.findMany({ where: { members: { some: { id: user.id } } }, include: { owner: true } })
  const dbUser = await db.user.findUnique({ where: { id: user.id }, include: { projectRoles: true } })
  if (!dbUser) throw new Error('Unable to find logged in user in database')

  const project = projects.find(project => project.id === params.id)
  if (!project) throw new Error('Project not found or you are not a member of the project')

  return (
    <>
      <SidebarHeaderLayout user={ user } sidebarContent={<>
        <MenuSiderbarGroup />
        <ProjectsSidebarGroup projects={ projects } />
        { dbUser.role === 'ADMIN' && (<AdminSidebarMenu />) }
      </>}>
        <ProjectHeader leftSide={
          <>
            <ProjectTitle project={ project } />
          </>
        } rightSide={ 
          <>
            <ProjectHeaderMenu dbUser={ dbUser } project={ project } user={ user } />
          </>
        } />
        { children }
      </SidebarHeaderLayout>
    </>
  )
}

export default ProjectPageLayout