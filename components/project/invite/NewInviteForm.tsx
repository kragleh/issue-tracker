"use client"
import Button, { ButtonVariant } from '@/components/ui/Button'
import NumberInput from '@/components/ui/NumberInput'
import React from 'react'

const NewInviteForm = ({ projectId }: { projectId: string }) => {
  const [uses, setUses] = React.useState(1)
  const [error, setError] = React.useState<undefined | string>(undefined)

  const handleSave = async () => {
    try {
      const response = await fetch('/api/project/invites/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectId, uses })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.parse(errorData.message)[0].message || 'Failed to save title')
      }

      window.location.href = '/project/' + projectId + '/invites'
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <section className='flex flex-col gap-2'>
      <h1>Invite Uses</h1>
      { error ? <p className='
        bg-red-100 dark:bg-red-900 
        border border-red-300 dark:border-red-700 
        px-2 py-1 rounded text-center
        w-full
        h-screen md:h-auto
      '>{ error }</p> : <></> }
      <NumberInput id='uses' onChange={ content => setUses(content) } />
      <Button onClick={ handleSave } variant={ ButtonVariant.SUCCESS } className='px-2'>
        Save
      </Button>
    </section>
  )
}

export default NewInviteForm