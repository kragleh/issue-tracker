import { auth } from '@/auth'
import SidebarHeaderLayout from '@/components/layout/SidebarHeaderLayout'
import { redirect } from 'next/navigation'
import React from 'react'
import { db } from '@/lib/db'
import MenuSiderbarGroup from '@/components/nav/groups/MenuSiderbarGroup'
import ProjectsSidebarGroup from '@/components/nav/groups/ProjectsSidebarGroup'
import AdminSidebarGroup from '@/components/nav/groups/AdminSidebarGroup'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
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
            { userObj && userObj.role === 'ADMIN' && (<AdminSidebarGroup />) }
          </> 
        }>
        { children }
      </SidebarHeaderLayout>
    </>
  )
}

export default HomeLayout