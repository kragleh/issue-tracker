import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const IssuesPage = async () => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/login?r=/issues')

  return (
    <main className='w-full max-w-6xl mx-auto p-4'>
      <h1 className='text-2xl'>Issues</h1>
      
      
    </main>
  )
}

export default IssuesPage