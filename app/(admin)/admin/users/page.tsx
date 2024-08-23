import { db } from '@/lib/db'
import React from 'react'

const AdminUsersPage = async () => {
  const users = await db.user.findMany()

  return (
    <div>AdminUsersPage</div>
  )
}

export default AdminUsersPage