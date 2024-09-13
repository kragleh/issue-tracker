"use client"
import React from 'react'
import BackButton from '../ui/BackButton'
import Footer from '../nav/Footer'
import Button, { ButtonVariant } from '../ui/Button'

const RemoveProjectMemberForm = ({ memberId, projectId }: { memberId: string, projectId: string }) => {
  const [error, setError] = React.useState('')

  const handleSubmit = async () => {
    const response = await fetch('/api/project/members/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ memberId, projectId })
    })

    if (!response.ok) {
      const errorData = await response.json()
      setError(JSON.parse(errorData.message)[0].message || 'Failed to remove member')
    }

    window.location.href = '/project/' + projectId + '/members'
  }

  return (
    <main className='w-full max-w-4xl mx-auto p-4 flex flex-col gap-4'>
      <section className='flex justify-between items-center'>
        <h1 className='text-2xl'>Remove Member?</h1>
        <BackButton />
      </section>
      { error ? <p className='
        bg-red-100 dark:bg-red-900 
        border border-red-300 dark:border-red-700 
        px-2 py-1 rounded text-center
        w-full
      '>{ error }</p> : <></> }
      <Button onClick={() => { handleSubmit() }} variant={ ButtonVariant.DANGER }>
        Remove
      </Button>
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default RemoveProjectMemberForm