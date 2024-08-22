import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import ProjectDescription from '@/components/project/ProjectDescription'
import ProfilePicture from '@/components/misc/ProfilePicture'
import Footer from '@/components/nav/Footer'
import ProjectHeader from '@/components/project/nav/ProjectHeader'
import ProjectPicture from '@/components/misc/ProjectPicture'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/project/' + params.id)

  const project = await prisma.project.findUnique({ where: { id: params.id }, include: { members: true, owner: true } })

  if (!project) redirect('/')
  if (!project.members.some(member => member.id === user.id)) redirect('/') // User is not a member of the project

  return (
    <>
      <ProjectHeader leftSide={ 
        <>
          <div className='flex gap-2 items-center'>
            <ProjectPicture project={ project } size={ 32 } />
            <h1>{ project.title }</h1>
          </div>
        </>
      } rightSide={ 
        <>
          
        </>
      } />

      <section className='max-w-4xl w-full mx-auto'>
        <div className='m-4 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4'>
          <div>
            <ProjectDescription project={ project } />
          </div>
          <div className='w-full'>
            <section className='
              bg-neutral-100 dark:bg-neutral-900 
              border border-neutral-300 dark:border-neutral-700 
              flex flex-row gap-4
              p-4 rounded-xl lg:mr-4
            '>
              <ProfilePicture user={ project.owner } size={ 48 } />
              <div className='flex flex-col justify-center'>
                <h1 className='text-xl font-semibold'>Owner</h1>
                <p className='text-sm'>{ project.owner.name }</p>
              </div>
            </section>
          </div>
        </div>
        <Footer className='mt-4 w-full text-center' />
      </section>
    </>
  )
}

export default ProjectPage