import { auth } from '@/auth'
import UsersView from '@/components/admin/users/UsersView'
import Footer from '@/components/nav/Footer'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const AdminUsersPage = async () => {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/signin?r=/admin/users')

  const users = await db.user.findMany()

  return (
    <main className='w-full max-w-6xl mx-auto p-4'>
      <h1 className='text-2xl mb-4'>Users</h1>
      <UsersView users={ users } />
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default AdminUsersPage