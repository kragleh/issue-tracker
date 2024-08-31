"use client"
import BackButton from '@/components/ui/BackButton'
import Button, { ButtonVariant } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Project, ProjectInvite } from '@prisma/client'
import React from 'react'

const InviteView = ({ invite, project }: { invite: ProjectInvite, project: Project }) => {
  const handleJoin = async () => {
    const response = await fetch('/api/project/invites/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inviteId: invite.id })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.parse(errorData.message)[0].message || 'Failed to use invite')
    }

    window.location.href = '/project/' + project.id
  }

  return (
    <main className='h-screen w-full flex flex-col items-center justify-center'>
      <Card className='flex flex-col gap-4 p-4 min-w-72'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl'>Join { project.title }?</h1>
          <BackButton />
        </div>
        <Button onClick={ handleJoin } variant={ ButtonVariant.SUCCESS }>
          Join
        </Button>
      </Card>
    </main>
  )
}

export default InviteView