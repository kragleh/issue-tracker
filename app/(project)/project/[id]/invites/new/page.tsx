import { auth } from '@/auth'
import Footer from '@/components/nav/Footer'
import NewInviteForm from '@/components/project/invite/NewInviteForm'
import BackButton from '@/components/ui/BackButton'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const NewInvitePage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/project/' + params.id + '/invites/new')

  const project = await db.project.findUnique({ where: { id: params.id }, include: { owner: true } })

  if (!project) throw new Error('Project not found')

  return (
    <main className='w-full max-w-4xl mx-auto p-4'>
      <section className='pb-4 flex justify-between items-center'>
        <h1 className='text-2xl'>New Invite</h1>
        <BackButton />
      </section>
      <NewInviteForm projectId={ project.id } />
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default NewInvitePage