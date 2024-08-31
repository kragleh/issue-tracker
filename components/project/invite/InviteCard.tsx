import LinkButton, { LinkButtonVariant } from '@/components/ui/LinkButton'
import { ProjectInvite } from '@prisma/client'
import React from 'react'
import { FaUsers } from 'react-icons/fa'

const InviteCard = ({ invite }: { invite: ProjectInvite }) => {
  return (
    <section className='flex justify-between items-center px-4 py-3 border-b last:border-b-0 border-neutral-200 dark:border-neutral-700
      even:bg-neutral-50 dark:even:bg-neutral-950/50 last:rounded-b-xl
    '>
      <div className='flex gap-2 items-center'>
        <h1 className='text-xl'>{ invite.id }</h1>
      </div>
      <div className='flex gap-2 items-center'>
        <FaUsers size={ 16 } />
        <p>{ invite.uses }</p>
        <LinkButton href={'/invite/' + invite.id + '/delete'} className='px-2' variant={ LinkButtonVariant.DANGER }>
          Delete
        </LinkButton>
      </div>
    </section>
  )
}

export default InviteCard