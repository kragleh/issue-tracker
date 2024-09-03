"use client"
import { ProjectInvite } from '@prisma/client'
import React from 'react'
import Button, { ButtonVariant } from '../ui/Button'

const DeleteInviteButton = ({ invite }: { invite: ProjectInvite }) => {
  const handleClick = async () => {
    const response = await fetch('/api/project/invites/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inviteId: invite.id })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.parse(errorData.message)[0].message || 'Failed to delete invite')
    }

    window.location.href = '/project/' + invite.projectId + '/invites'
  }

  return (
    <Button onClick={ handleClick } variant={ ButtonVariant.DANGER } className='w-full'>
      Delete
    </Button>
  )
}

export default DeleteInviteButton