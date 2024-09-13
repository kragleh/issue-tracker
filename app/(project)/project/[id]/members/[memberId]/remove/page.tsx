import { auth } from '@/auth'
import RemoveProjectMemberForm from '@/components/form/RemoveProjectMemberForm'
import { RolePermissions } from '@/lib/RolePermissions'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const RemoveProjectMemberPage = async ({ params }: { params: { id: string, memberId: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/project/' + params.id + '/issues/new')

  const dbUser = await db.user.findUnique({ where: { id: user.id }, include: { projectRoles: true } })
  if (!dbUser) throw new Error('User not found in database')

  const member = await db.user.findUnique({ where: { id: params.memberId } })
  if (!member) throw new Error('Member not found')

  const project = await db.project.findUnique({ where: { id: params.id }, include: { owner: true } })
  if (!project) throw new Error('Project not found')

  if (project.owner.id === member.id) throw new Error('You are not allowed to remove the owner')
  if (!dbUser.projectRoles.find(role => role.projectId === project.id, RolePermissions.DELETE_MEMBER) && project.owner.id !== user.id) throw new Error('You don\'t have permission to remove members')

  return (
    <>
      <RemoveProjectMemberForm memberId={ params.memberId } projectId={ project.id } />
    </>
  )
}

export default RemoveProjectMemberPage