import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import ProjectDescription from '@/components/project/ProjectDescription'
import Footer from '@/components/nav/Footer'
import ProjectHeader from '@/components/project/nav/ProjectHeader'
import ProjectPicture from '@/components/misc/ProjectPicture'
import { PrismaClient } from '@prisma/client'
import ProjectOwnerCard from '@/components/project/home/ProjectOwnerCard'
import Link from 'next/link'

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
          <div className='flex items-center gap-2'>
            <Link href={'/project/' + params.id + '/issues'}>
              Issues
            </Link>
            {/* TODO: Show link for corresponding roles */}
            {
              user.id === project.owner.id ? 
                <Link href={'/project/' + params.id + '/Settings'}>
                  Settings
                </Link>
              : <></>
            }
          </div>
        </>
      } />

      <section className='max-w-4xl w-full mx-auto'>
        <div className='m-4 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4'>
          <div>
            <ProjectDescription project={ project } />
          </div>
          <div className='w-full'>
            <ProjectOwnerCard user={ project.owner } />
          </div>
        </div>
        <Footer className='mt-4 w-full text-center' />
      </section>
    </>
  )
}

export default ProjectPage