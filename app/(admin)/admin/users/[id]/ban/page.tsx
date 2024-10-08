import { auth } from '@/auth'
import UserBanForm from '@/components/admin/users/UserBanForm'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminUsersBanPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/admin/users/' + params.id + '/ban')

  const banUser = await db.user.findUnique({ where: { id: params.id } })
  if (!banUser) throw new Error('User not found')
  if (banUser.id === user.id) throw new Error('You cannot ban yourself')
  if (banUser.banned) throw new Error('User is already banned')

  return (
    <UserBanForm user={ banUser } />
  )
}

export default AdminUsersBanPage