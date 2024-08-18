import { auth } from '@/auth'
import CardLayout from '@/components/misc/CardLayout'
import ProfilePicture from '@/components/misc/ProfilePicture'
import ProjectPicture from '@/components/misc/ProjectPicture'
import SidebarButton from '@/components/nav/SidebarButton'
import SidebarGroup from '@/components/nav/SidebarGroup'
import SidebarHeaderLayout from '@/components/nav/SidebarHeaderLayout'
import ProjectDescription from '@/components/project/ProjectDescription'
import prisma from '@/lib/Prisma'
import { redirect } from 'next/navigation'
import React from 'react'
import { BsGraphUp, BsPeopleFill } from 'react-icons/bs'
import { FaHome, FaPlus } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/project/' + params.id)

  const project = await prisma.project.findUnique({ where: { id: params.id }, include: { members: true, owner: true } })

  if (!project) redirect('/')
  if (!project.members.some(member => member.id === user.id)) redirect('/') // User is not a member of the project

  const projects = await prisma.project.findMany({ where: { members: { some: { id: user.id } } } })

  return (
    <>
      <SidebarHeaderLayout user={ user } projects={ projects }
        sidebarContent={
          <>
            <SidebarGroup title={ project.title }>
              <SidebarButton icon={ <FaHome size={ 24 } /> } title='Home' href={'/project/' + project.id } />
            </SidebarGroup>

            <SidebarGroup title='Home'>
              <SidebarButton icon={ <MdDashboard size={ 24 } /> } title='Dashboard' href='/' />
            </SidebarGroup>

            <SidebarGroup title='Projects'>
              {
                projects && projects.map(project => (
                  <SidebarButton key={project.id} icon={ <ProjectPicture project={ project } size={ 24 } /> } title={ project.title } href={ `/project/${ project.id }` } />
                ))
              }
              <SidebarButton icon={ <FaPlus size={ 24 } /> } title='New Project' href='/new/project' />
            </SidebarGroup>

            <SidebarGroup title='Admin'>
              <SidebarButton icon={ <BsPeopleFill size={ 24 } /> } title='Users' href='/admin/users' />
              <SidebarButton icon={ <BsGraphUp size={ 24 } /> } title='Stats' href='/admin/stats' />
            </SidebarGroup>
          </>
        }

        leftHeader={
          <>
            <div className='flex gap-2 items-center'>
              <ProjectPicture project={ project } size={ 32 } />
              <h1 className='text-2xl'>{ project.title }</h1>
            </div>  
          </>
        }
      >
        <section className='max-w-4xl w-full mx-auto'>
          <div className='m-4 grid grid-cols-[653px_288px] gap-4'>
            <div>
              <ProjectDescription project={ project } />
            </div>
            <div>
              <section className='
                bg-neutral-100 dark:bg-neutral-900 
                border border-neutral-300 dark:border-neutral-700 
                flex flex-row gap-4
                p-4 rounded-xl
              '>
                <ProfilePicture user={ project.owner } size={ 48 } />
                <div className='flex flex-col justify-center'>
                  <h1 className='text-xl font-semibold'>Owner</h1>
                  <p className='text-sm'>{ project.owner.name }</p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </SidebarHeaderLayout>
    </>
  )
}

export default ProjectPage