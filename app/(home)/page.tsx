import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const HomePage = async () => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/login?r=/')

  return (
    <main className='w-full max-w-6xl mx-auto p-4'>
      <h1 className='text-2xl'>Home</h1>
      { /** TODO: Add home page feed inspired by github */ }
    </main>
  )
}

export default HomePage