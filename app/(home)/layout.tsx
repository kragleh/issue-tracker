"use server"
import { auth } from '@/auth'
import SidebarHeaderLayout from '@/components/layout/SidebarHeaderLayout'
import ProjectPicture from '@/components/misc/ProjectPicture'
import SidebarButton from '@/components/nav/SidebarButton'
import SidebarGroup from '@/components/nav/SidebarGroup'
import prisma from '@/lib/Prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import { BsGraphUp, BsPeopleFill } from 'react-icons/bs'
import { FaHome, FaPlus } from 'react-icons/fa'
import { MdChecklist } from 'react-icons/md'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
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
              <SidebarButton icon={ <MdChecklist size={ 24 } /> } title='My Issues' href='/issues' />
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
              userObj && userObj.role === 'ADMIN' && (<>
                <SidebarGroup title='Admin'>
                  <SidebarButton icon={ <BsPeopleFill size={ 24 } /> } title='Users' href='/admin/users' />
                  <SidebarButton icon={ <BsGraphUp size={ 24 } /> } title='Stats' href='/admin/stats' />
                </SidebarGroup>
              </>)
            }
          </> 
        }>
        { children }
      </SidebarHeaderLayout>
    </>
  )
}

export default HomeLayout