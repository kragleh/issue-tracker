import { auth } from '@/auth'
import DeleteInviteButton from '@/components/actions/DeleteInviteButton'
import CardHeaderWithBackButton from '@/components/ui/CardHeaderWithBackButton'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const DeleteInvitePage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/delete/invite/' + params.id)

  const invite = await db.projectInvite.findUnique({ where: { id: params.id }, include: { project: true } })
  if (!invite) throw new Error('Invite not found')

  return (
    <>
      <CardHeaderWithBackButton title='Delete Invite' />
      <p>Are you sure you want to delete this invite?</p>
      <DeleteInviteButton invite={ invite } />
    </>
  )
}

export default DeleteInvitePage