import { auth } from '@/auth'
import SidebarHeaderLayout from '@/components/layout/SidebarHeaderLayout'
import AdminSidebarGroup from '@/components/nav/groups/AdminSidebarGroup'
import MenuSiderbarGroup from '@/components/nav/groups/MenuSiderbarGroup'
import ProjectsSidebarGroup from '@/components/nav/groups/ProjectsSidebarGroup'
import { db } from '@/lib/db'
import React from 'react'

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  const user = session?.user

  if (!user) return (<>{ children }</>) // To let the page redirect itself

  const projects = await db.project.findMany({ where: { members: { some: { id: user.id } } } })
  const userObj = await db.user.findUnique({ where: { id: user.id } })

  if (userObj && userObj.role !== 'ADMIN') throw new Error('Unauthorized')

  return (
    <>
      <SidebarHeaderLayout
        user={ user }
        sidebarContent={ 
          <>
            <MenuSiderbarGroup />
            <ProjectsSidebarGroup projects={ projects } />
            <AdminSidebarGroup />
          </> 
        }>
        { children }
      </SidebarHeaderLayout>
    </>
  )
}

export default AdminLayout