import { auth } from '@/auth'
import Footer from '@/components/nav/Footer'
import RolesView from '@/components/project/roles/RolesView'
import LinkButton, { LinkButtonVariant } from '@/components/ui/LinkButton'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const ProjectRolesPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user
  let moderator = false

  if (!user) redirect('/signin?r=/project/' + params.id + '/roles')

  const project = await db.project.findUnique({ where: { id: params.id }, include: { owner: true, projectRoles: true } })

  if (!project) throw new Error('Project not found')

  if (project.owner.id === user.id) moderator = true

  return (
    <main className='w-full max-w-4xl mx-auto p-4'>
      <section className='pb-4 flex justify-between items-center'>
        <h1 className='text-2xl'>Roles</h1>
        <LinkButton href={'/project/' + params.id + '/roles/create'} variant={ LinkButtonVariant.SUCCESS } className='px-2'>
          New
        </LinkButton>
      </section>
      <RolesView roles={ project.projectRoles } moderator={ moderator } />
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default ProjectRolesPage