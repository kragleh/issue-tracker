import { db } from '@/lib/db'
import { IssueMessage, IssueMessageType } from '@prisma/client'
import React from 'react'
import Card from './Card'
import ProfilePicture from './ProfilePicture'

const IssueMessage = async ({ message }: { message: IssueMessage }) => {
  if (message.type === IssueMessageType.SYSTEM) {
    return (
      <>
        <h1>{ message.message }</h1>
      </>
    )
  }

  if (!message.ownerId) return (<></>)

  const owner = await db.user.findUnique({ where: { id: message.ownerId } })

  if (!owner) return (<></>)

  return (
    <Card>
      <div className='flex gap-2 items-center p-2'>
        <ProfilePicture user={ owner } size={ 16 } />
        <h1>{ owner.name }</h1>
        <p>at { new Date(message.createdAt).toLocaleString() }</p>
      </div>
    </Card>
  )
}

export default IssueMessage