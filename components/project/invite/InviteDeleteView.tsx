"use client"
import BackButton from '@/components/ui/BackButton'
import Button, { ButtonVariant } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import React from 'react'

const InviteDeleteView = ({ inviteId, projectId }: { inviteId: string, projectId: string }) => {
  const handleDelete = async () => {
    const response = await fetch('/api/project/invites/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inviteId })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.parse(errorData.message)[0].message || 'Failed to delete invite')
    }

    window.location.href = '/project/' + projectId + '/invites'
  }

  return (
    <main className='h-screen w-full flex flex-col items-center justify-center'>
      <Card className='flex flex-col gap-4 p-4 min-w-72'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl'>Delete Invite?</h1>
          <BackButton />
        </div>
        <Button onClick={ handleDelete } variant={ ButtonVariant.DANGER }>
          Delete
        </Button>
      </Card>
    </main>
  )
}

export default InviteDeleteView