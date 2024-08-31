import { auth } from '@/auth'
import Footer from '@/components/nav/Footer'
import MembersView from '@/components/project/members/MembersView'
import ProjectHeader from '@/components/project/nav/ProjectHeader'
import ProjectTitle from '@/components/project/nav/ProjectTitle'
import LinkButton from '@/components/ui/LinkButton'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const MembersPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user
  let moderator = false

  if (!user) redirect('/login?r=/project/' + params.id + '/issues')

  const project = await db.project.findUnique({ where: { id: params.id }, include: { owner: true, members: true } })

  if (!project) throw new Error('Project not found')

  if (project.owner.id === user.id) moderator = true

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
                <LinkButton href={'/project/' + params.id + '/settings'}>
                  Settings
                </LinkButton>
              : <></>
            }
          </div>
        </>
      } />

      <main className='w-full max-w-4xl mx-auto p-4'>
        <section className='pb-4 flex justify-between items-center'>
          <h1 className='text-2xl'>Members</h1>
        </section>
        <MembersView members={ project.members } moderator={ moderator } />
        <Footer className='mt-4 w-full text-center' />
      </main>
    </>
  )
}

export default MembersPage