import { auth } from '@/auth'
import SidebarHeaderLayout from '@/components/layout/SidebarHeaderLayout'
import AdminSidebarMenu from '@/components/nav/groups/AdminSidebarGroup'
import MenuSiderbarGroup from '@/components/nav/groups/MenuSiderbarGroup'
import ProjectsSidebarGroup from '@/components/nav/groups/ProjectsSidebarGroup'
import ProjectHeader from '@/components/project/nav/ProjectHeader'
import ProjectTitle from '@/components/project/nav/ProjectTitle'
import LinkButton from '@/components/ui/LinkButton'
import { hasPermissionInRoles } from '@/lib/PermUtil'
import { RolePermissions } from '@/lib/RolePermissions'
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
            <div className='flex items-center gap-2'>
              {
                hasPermissionInRoles(dbUser.projectRoles, RolePermissions.VIEW_ISSUES)
                ||
                project.owner.id === user.id
                ?
                <LinkButton href={'/project/' + params.id + '/issues'}>
                  Issues
                </LinkButton>
                :
                <></>
              }
              {
                hasPermissionInRoles(dbUser.projectRoles, RolePermissions.VIEW_MEMBERS)
                ||
                project.owner.id === user.id
                ?
                <LinkButton href={'/project/' + params.id + '/members'}>
                  Members
                </LinkButton>
                :
                <></>
              }
              {
                hasPermissionInRoles(dbUser.projectRoles, RolePermissions.VIEW_ROLES)
                ||
                project.owner.id === user.id
                ?
                <LinkButton href={'/project/' + params.id + '/roles'}>
                  Roles
                </LinkButton>
                :
                <></>
              }
              {
                hasPermissionInRoles(dbUser.projectRoles, RolePermissions.VIEW_INVITES)
                ||
                project.owner.id === user.id
                ?
                <LinkButton href={'/project/' + params.id + '/invites'}>
                  Invites
                </LinkButton>
                :
                <></>
              }
              {
                hasPermissionInRoles(dbUser.projectRoles, RolePermissions.EDIT_SETTINGS)
                ||
                project.owner.id === user.id
                ?
                <LinkButton href={'/project/' + params.id + '/settings'}>
                  Settings
                </LinkButton>
                :
                <></>
              }
            </div>
          </>
        } />
        { children }
      </SidebarHeaderLayout>
    </>
  )
}

export default ProjectPageLayout