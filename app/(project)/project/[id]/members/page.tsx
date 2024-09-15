import { auth } from '@/auth'
import Footer from '@/components/nav/Footer'
import MembersView from '@/components/view/MembersView'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const MembersPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/project/' + params.id + '/members')

  const dbUser = await db.user.findUnique({ where: { id: user.id }, include: { projectRoles: true } })
  if (!dbUser) throw new Error('User not found in database')

  const project = await db.project.findUnique({ where: { id: params.id }, include: { owner: true, members: true } })
  if (!project) throw new Error('Project not found')

  return (
    <main className='w-full max-w-4xl mx-auto p-4'>
      <section className='pb-4 flex justify-between items-center'>
        <h1 className='text-2xl'>Members</h1>
      </section>
      <MembersView members={ project.members } 
        edit={ user.id === project.owner.id || hasPermissionInRoles(dbUser.projectRoles, RolePermissions.EDIT_MEMBER) }
        remove={ user.id === project.owner.id || hasPermissionInRoles(dbUser.projectRoles, RolePermissions.DELETE_MEMBER) }
        ban={ user.id === project.owner.id || hasPermissionInRoles(dbUser.projectRoles, RolePermissions.BAN_MEMBER) }
      />
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default MembersPage