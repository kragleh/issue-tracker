import { auth } from '@/auth'
import SidebarHeaderLayout from '@/components/layout/SidebarHeaderLayout'
import AdminSidebarMenu from '@/components/nav/groups/AdminSidebarGroup'
import MenuSiderbarGroup from '@/components/nav/groups/MenuSiderbarGroup'
import ProjectsSidebarGroup from '@/components/nav/groups/ProjectsSidebarGroup'
import ProjectHeader from '@/components/project/nav/ProjectHeader'
import ProjectTitle from '@/components/project/nav/ProjectTitle'
import LinkButton from '@/components/ui/LinkButton'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const ProjectPageLayout = async ({ children, params }: { children: React.ReactNode, params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) return (<>{ children }</>) // So the page redirects properly

  const projects = await db.project.findMany({ where: { members: { some: { id: user.id } } }, include: { owner: true } })
  const userObj = await db.user.findUnique({ where: { id: user.id } })

  const project = projects.find(project => project.id === params.id)

  if (!project) redirect('/')

  return (
    <>
      <SidebarHeaderLayout user={ user } sidebarContent={
        <>
          <MenuSiderbarGroup />
          <ProjectsSidebarGroup projects={ projects } />
          { userObj && userObj.role === 'ADMIN' && (<AdminSidebarMenu />) }
        </>
      }>
        <ProjectHeader leftSide={ 
          <>
            <ProjectTitle project={ project } />
          </>
        } rightSide={ 
          <>
            <div className='flex items-center gap-2'>
              <LinkButton href={'/project/' + params.id + '/issues'}>
                Issues
              </LinkButton>
              <LinkButton href={'/project/' + params.id + '/members'}>
                Members
              </LinkButton>
              {/* TODO: Show link for corresponding roles */}
              {
                user.id === project.owner.id ? 
                  <>
                    <LinkButton href={'/project/' + params.id + '/invites'}>
                      Invites
                    </LinkButton>
                    <LinkButton href={'/project/' + params.id + '/settings'}>
                      Settings
                    </LinkButton>
                  </>
                : <></>
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