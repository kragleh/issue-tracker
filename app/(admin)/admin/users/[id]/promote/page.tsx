import { auth } from '@/auth'
import UserPromoteForm from '@/components/admin/users/UserPromoteForm'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminUsersPromotePage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/admin/users/' + params.id + '/promote')

  const promoteUser = await db.user.findUnique({ where: { id: params.id } })
  if (!promoteUser) throw new Error('User not found')
  if (promoteUser.id === user.id) throw new Error('You cannot promote yourself')
  if (promoteUser.role === "ADMIN") throw new Error('User is already promoted')

  return (
    <UserPromoteForm user={ promoteUser } />
  )
}

export default AdminUsersPromotePage