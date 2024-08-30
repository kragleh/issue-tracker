import { auth } from '@/auth'
import IssuesView from '@/components/issue/IssuesView'
import Footer from '@/components/nav/Footer'
import ProjectHeader from '@/components/project/nav/ProjectHeader'
import ProjectTitle from '@/components/project/nav/ProjectTitle'
import LinkButton, { LinkButtonVariant } from '@/components/ui/LinkButton'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const ProjectIssues = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/login?r=/project/' + params.id + '/issues')

  const project = await db.project.findUnique({ where: { id: params.id }, include: { owner: true } })

  if (!project) throw new Error('Project not found')

  const issues = await db.issue.findMany({
    include: {
      project: true,
      messages: true,
      owner: true,
    },
    where: {
      projectId: params.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <>
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
                <LinkButton href={'/project/' + params.id + '/Settings'}>
                  Settings
                </LinkButton>
              : <></>
            }
          </div>
        </>
      } />

      <main className='w-full max-w-4xl mx-auto p-4'>
        <section className='pb-4 flex justify-between items-center'>
          <h1 className='text-2xl'>Issues</h1>
          <LinkButton href={'/project/' + params.id + '/issues/new'} variant={ LinkButtonVariant.SUCCESS }>
            New
          </LinkButton>
        </section>
        <IssuesView issues={ issues } />
        <Footer className='mt-4 w-full text-center' />
      </main>
    </>
    
  )
}

export default ProjectIssues