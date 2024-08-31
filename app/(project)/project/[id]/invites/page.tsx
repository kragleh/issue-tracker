import { auth } from '@/auth'
import Footer from '@/components/nav/Footer'
import InvitesView from '@/components/project/invite/InvitesView'
import LinkButton, { LinkButtonVariant } from '@/components/ui/LinkButton'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const ProjectInvitesPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/project/' + params.id + '/invites')

  const project = await db.project.findUnique({ where: { id: params.id }, include: { owner: true } })

  if (!project) throw new Error('Project not found')

  const invites = await db.projectInvite.findMany({
    where: {
      projectId: params.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className='w-full max-w-4xl mx-auto p-4'>
      <section className='pb-4 flex justify-between items-center'>
        <h1 className='text-2xl'>Invites</h1>
        <LinkButton href={'/project/' + params.id + '/invites/new'} variant={ LinkButtonVariant.SUCCESS }>
          New
        </LinkButton>
      </section>
      <InvitesView invites={ invites } />
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default ProjectInvitesPage