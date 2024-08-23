import ProfilePicture from '@/components/misc/ProfilePicture'
import LinkButton, { LinkButtonVariant } from '@/components/ui/LinkButton'
import { User } from '@prisma/client'
import React from 'react'

const UserRow = ({ user }: { user: User }) => {
  return (
    <div className='
      flex justify-between items-center
      even:bg-black/20 dark:even:bg-white/20
      p-2
    '>
      <div className='flex gap-2 items-center'>
        <ProfilePicture user={ user } size={ 24 } />
        <p>{ user.name }</p>
      </div>
      <div className='flex gap-2 items-center'>
        { user.email || 'unknown@email.com' }
      </div>
      <div className='flex gap-2 items-center'>
        <LinkButton href={`/admin/users/ban/${user.id}`} className='px-2' variant={ LinkButtonVariant.WARNING }>
          Ban
        </LinkButton>
        <LinkButton href={`/admin/users/delete/${user.id}`} className='px-2' variant={ LinkButtonVariant.DANGER }>
          Delete
        </LinkButton>
      </div>
    </div>
  )
}

export default UserRow