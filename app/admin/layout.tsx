import { auth } from '@/auth'
import React from 'react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  const user = session?.user

  if (!user) throw new Error('Unauthorized')

  const userObj = await prisma.user.findUnique({ where: { id: user.id }, select: { role: true } })

  if (!userObj) throw new Error('Couldn\'t find user')
  if (userObj.role !== 'ADMIN') throw new Error('Missing admin role')

  return (
    <>
      <h1>Admin layout</h1>
    </>
  )
}

export default AdminLayout