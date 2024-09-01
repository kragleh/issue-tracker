import { auth } from '@/auth'
import UserUnbanForm from '@/components/admin/users/UserUnbanForm'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminUsersUnbanPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/admin/users/' + params.id + '/ban')

  const unbanUser = await db.user.findUnique({ where: { id: params.id } })
  if (!unbanUser) throw new Error('User not found')
  if (!unbanUser.banned) throw new Error('User is not banned')

  return (
    <UserUnbanForm user={ unbanUser } />
  )
}

export default AdminUsersUnbanPage