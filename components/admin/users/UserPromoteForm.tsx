"use client"
import Footer from '@/components/nav/Footer'
import BackButton from '@/components/ui/BackButton'
import Button, { ButtonVariant } from '@/components/ui/Button'
import { User } from '@prisma/client'
import React from 'react'

const UserPromoteForm = ({ user }: { user: User }) => {
  const [error, setError] = React.useState<undefined | string>(undefined)

  const handlePromote = async () => {
    try {
      const response = await fetch('/api/admin/users/promote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.parse(errorData.message)[0].message || 'Failed to promote user')
      }

      window.location.href = '/admin/users'
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <main className='w-full max-w-6xl mx-auto p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl'>Promote User</h1>
        <BackButton />
      </div>
      <p className='my-4'>Are you sure you want to promote <b>{ user.name }</b>?</p>
      { error ? <p className='
        bg-red-100 dark:bg-red-900 
        border border-red-300 dark:border-red-700 
        px-2 py-1 rounded text-center
        w-full
        h-screen md:h-auto
      '>{ error }</p> : <></> }
      <Button onClick={ handlePromote } variant={ ButtonVariant.SUCCESS } className='w-full'>
        Promote
      </Button>
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default UserPromoteForm