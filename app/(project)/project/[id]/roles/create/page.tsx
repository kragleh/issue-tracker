import { auth } from '@/auth'
import Footer from '@/components/nav/Footer'
import CreateRoleForm from '@/components/project/roles/CreateRoleForm'
import BackButton from '@/components/ui/BackButton'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const CreateRolePage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/project/' + params.id + '/roles/create')

  const project = await db.project.findUnique({ where: { id: params.id } })

  if (!project) throw new Error('Project not found')

  // Check roles if user can create roles

  return (
    <main className='w-full max-w-4xl mx-auto p-4'>
      <section className='pb-4 flex justify-between items-center'>
        <h1 className='text-2xl'>Create Role</h1>
        <BackButton />
      </section>
      <div className='flex flex-col gap-4'>
        <CreateRoleForm projectId={ params.id } />
      </div>
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default CreateRolePage