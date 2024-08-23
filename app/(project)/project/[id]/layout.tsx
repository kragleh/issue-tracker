import { auth } from '@/auth'
import SidebarHeaderLayout from '@/components/layout/SidebarHeaderLayout'
import ProjectPicture from '@/components/misc/ProjectPicture'
import AdminSidebarMenu from '@/components/nav/groups/AdminSidebarGroup'
import SidebarButton from '@/components/nav/SidebarButton'
import SidebarGroup from '@/components/nav/SidebarGroup'
import { redirect } from 'next/navigation'
import React from 'react'
import { FaHome, FaPlus } from 'react-icons/fa'
import { MdChecklist } from 'react-icons/md'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ProjectPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin')

  const projects = await prisma.project.findMany({
    where: {
      members: {
        some: {
          id: user.id,
        },
      },
    }
  })

  const userObj = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  })

  return (
    <>
      <SidebarHeaderLayout
        user={ user }
        sidebarContent={ 
          <>
            <SidebarGroup title='Menu'>
              <SidebarButton icon={ <FaHome size={ 24 } /> } title='Home' href='/' />
              <SidebarButton icon={ <MdChecklist size={ 24 } /> } title='Issues' href='/issues' />
            </SidebarGroup>

            <SidebarGroup title='Projects'>
              {
                projects && projects.map(project => (
                  <SidebarButton key={project.id} icon={ <ProjectPicture project={ project } size={ 24 } /> } title={ project.title } href={ `/project/${ project.id }` } />
                ))
              }
              <SidebarButton icon={ <FaPlus size={ 24 } /> } title='New Project' href='/project/new' />
            </SidebarGroup>

            {
              userObj && userObj.role === 'ADMIN' && (<AdminSidebarMenu />)
            }
          </> 
        }>
        { children }
      </SidebarHeaderLayout>
    </>
  )
}

export default ProjectPageLayout