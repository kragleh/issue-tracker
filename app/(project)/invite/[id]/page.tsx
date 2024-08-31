import { auth } from '@/auth'
import InviteView from '@/components/project/invite/InviteView'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const InvitePage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login?r=/invite/' + params.id)

  const invite = await db.projectInvite.findUnique({ where: { id: params.id }, include: { project: true } })
  if (!invite) throw new Error('Invite not found')

  if (invite.uses === 0) redirect('/')

  const project = await db.project.findUnique({ where: { id: invite.project.id }, include: { members: true } })
  if (!project) throw new Error('Project not found')

  if (project.members.some(member => member.id === user.id)) redirect('/project/' + invite.project.id)

  return (
    <InviteView invite={ invite } project={ project } />
  )
}

export default InvitePage