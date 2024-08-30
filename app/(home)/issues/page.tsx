import { auth } from '@/auth'
import Footer from '@/components/nav/Footer'
import { redirect } from 'next/navigation'
import React from 'react'
import { db } from '@/lib/db'
import IssuesView from '@/components/issue/IssuesView'

const IssuesPage = async () => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/login?r=/issues')

  const issues = await db.issue.findMany({
    include: {
      project: true,
      messages: true,
      owner: true,
    },
    where: {
      OR: [
        { ownerId: user.id },
        { project: { members: { some: { id: user.id } } } },
      ]
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className='w-full max-w-6xl mx-auto p-4'>
      <h1 className='text-2xl mb-4'>Issues</h1>
      <IssuesView issues={ issues } />
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default IssuesPage