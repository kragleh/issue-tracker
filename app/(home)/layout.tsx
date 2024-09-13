import { auth } from '@/auth'
import SidebarHeaderLayout from '@/components/layout/SidebarHeaderLayout'
import React from 'react'
import { db } from '@/lib/db'
import MenuSiderbarGroup from '@/components/nav/groups/MenuSiderbarGroup'
import ProjectsSidebarGroup from '@/components/nav/groups/ProjectsSidebarGroup'
import AdminSidebarGroup from '@/components/nav/groups/AdminSidebarGroup'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  const user = session?.user

  if (!user) return (<>{ children }</>)

  const projects = await db.project.findMany({ where: { members: { some: { id: user.id } } } })
  const dbUser = await db.user.findUnique({ where: { id: user.id } })

  if (!dbUser) throw new Error('Unable to find logged in user in database')

  return (
    <>
      <SidebarHeaderLayout 
        user={ user }
        sidebarContent={ 
          <>
            <MenuSiderbarGroup />
            <ProjectsSidebarGroup projects={ projects } />
            { dbUser.role === 'ADMIN' && (<AdminSidebarGroup />) }
          </> 
        }>
        { children }
      </SidebarHeaderLayout>
    </>
  )
}

export default HomeLayout