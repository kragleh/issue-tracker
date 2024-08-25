import { auth } from '@/auth'
import Footer from '@/components/nav/Footer'
import Card from '@/components/ui/Card'
import { redirect } from 'next/navigation'
import React from 'react'
import { db } from '@/lib/db'
import IssueCard from '@/components/issue/IssueCard'

const IssuesPage = async () => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/login?r=/issues')

  const issues = await db.issue.findMany({
    take: 10,
    include: {
      project: true,
      messages: true,
      owner: true,
    },
    where: {
      ownerId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className='w-full max-w-6xl mx-auto p-4'>
      <h1 className='text-2xl mb-4'>Issues</h1>
      <Card>
        {
          issues.length > 0 ?
          issues.map((issue) => (
            <IssueCard key={issue.id} issue={ issue } owner={ issue.owner.name } messages={ issue.messages.length } />
          ))
          :
          <>
            <div className='text-center'>
              <h1 className='text-xl'>Welcome to issues!</h1>
              <p className='text-neutral-700 dark:text-neutral-300'>Here you can find all the issues you have interacted with.</p>
            </div>
          </>
        }
      </Card>
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default IssuesPage