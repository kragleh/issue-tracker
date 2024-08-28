import { auth } from '@/auth'
import NewProjectIssueMessageForm from '@/components/form/NewProjectIssueMessageForm'
import Footer from '@/components/nav/Footer'
import ProjectOwnerCard from '@/components/project/home/ProjectOwnerCard'
import ProjectHeader from '@/components/project/nav/ProjectHeader'
import ProjectTitle from '@/components/project/nav/ProjectTitle'
import BackButton from '@/components/ui/BackButton'
import IssueMessage from '@/components/ui/IssueMessage'
import IssueStatusIcon from '@/components/ui/IssueStatusIcon'
import LinkButton from '@/components/ui/LinkButton'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const ProjectIssuePage = async ({ params }: { params: { id: string, issueId: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/login?r=/project/' + params.id + '/issues/' + params.issueId)

  const project = await db.project.findUnique({ where: { id: params.id }, include: { owner: true } })

  if (!project) throw new Error('Project not found')

  const issue = await db.issue.findFirst({
    include: {
      messages: true,
      owner: true,
    },
    where: {
      id: params.issueId,
    },
  })

  if (!issue) throw new Error('Issue not found')

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

      <main className='w-full max-w-4xl mx-auto p-4 flex flex-col gap-4'>
        <section className='flex justify-between items-center'>
          <h1 className='text-2xl flex gap-2 items-center'>
            <IssueStatusIcon opened={ issue.opened } size={ 24 } />
            { issue.title }
          </h1>
          <BackButton />
        </section>
        <div className='grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4'>
          <div className='flex flex-col gap-4'>
            {
              issue.messages.map(message => (
                <IssueMessage key={ message.id } message={ message } />
              ))
            }
            <NewProjectIssueMessageForm projectId={ project.id } issueId={ issue.id } />
          </div>
          <div className='w-full'>
            <ProjectOwnerCard user={ project.owner } />
          </div>
        </div>
        <Footer className='mt-4 w-full text-center' />
      </main>
    </>
    
  )
}

export default ProjectIssuePage