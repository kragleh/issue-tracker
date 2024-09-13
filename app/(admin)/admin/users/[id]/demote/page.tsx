import { auth } from '@/auth'
import UserDemoteForm from '@/components/admin/users/UserDemoteForm'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminUsersDemotePage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/admin/users/' + params.id + '/demote')

  const demoteUser = await db.user.findUnique({ where: { id: params.id } })
  if (!demoteUser) throw new Error('User not found')
  if (demoteUser.role === "USER") throw new Error('User is already demoted')

  return (
    <UserDemoteForm user={ demoteUser } />
  )
}

export default AdminUsersDemotePage