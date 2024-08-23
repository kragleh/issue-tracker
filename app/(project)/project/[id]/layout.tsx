import { auth } from '@/auth'
import SidebarHeaderLayout from '@/components/layout/SidebarHeaderLayout'
import AdminSidebarMenu from '@/components/nav/groups/AdminSidebarGroup'
import MenuSiderbarGroup from '@/components/nav/groups/MenuSiderbarGroup'
import ProjectsSidebarGroup from '@/components/nav/groups/ProjectsSidebarGroup'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const ProjectPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin')

  const projects = await db.project.findMany({ where: { members: { some: { id: user.id } } } })
  const userObj = await db.user.findUnique({ where: { id: user.id } })

  return (
    <>
      <SidebarHeaderLayout
        user={ user }
        sidebarContent={ 
          <>
            <MenuSiderbarGroup />
            <ProjectsSidebarGroup projects={ projects } />
            { userObj && userObj.role === 'ADMIN' && (<AdminSidebarMenu />) }
          </> 
        }>
        { children }
      </SidebarHeaderLayout>
    </>
  )
}

export default ProjectPageLayout