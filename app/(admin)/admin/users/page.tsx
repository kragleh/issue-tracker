import UserRow from '@/components/admin/users/UserRow'
import Footer from '@/components/nav/Footer'
import Card from '@/components/ui/Card'
import { db } from '@/lib/db'
import React from 'react'

const AdminUsersPage = async () => {
  const users = await db.user.findMany({ take: 10 })

  return (
    <main className='w-full max-w-6xl mx-auto p-4'>
      <h1 className='text-2xl mb-4'>Users</h1>
      <Card className='overflow-hidden'>
        {
          users.map((user) => (<UserRow key={ user.id } user={ user } />))
        }
      </Card>
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default AdminUsersPage