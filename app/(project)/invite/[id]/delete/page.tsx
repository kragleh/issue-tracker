import { auth } from '@/auth'
import InviteDeleteView from '@/components/project/invite/InviteDeleteView'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const DeleteInvitePage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login?r=/invite/' + params.id + '/delete')

  const invite = await db.projectInvite.findUnique({ where: { id: params.id }, include: { project: true } })
  if (!invite) throw new Error('Invite not found')

  const project = await db.project.findUnique({ where: { id: invite.project.id }, include: { owner: true } })
  if (!project) throw new Error('Project not found')

  if (project.owner.id !== user.id) throw new Error('You are not allowed to delete this invite')

  return (
    <InviteDeleteView inviteId={ params.id } projectId={ project.id } />
  )
}

export default DeleteInvitePage