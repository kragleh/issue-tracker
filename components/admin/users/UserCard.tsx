import LinkButton, { LinkButtonVariant } from '@/components/ui/LinkButton'
import ProfilePicture from '@/components/ui/ProfilePicture'
import { User } from '@prisma/client'
import React from 'react'

const UserCard = ({ user }: { user: User }) => {
  return (
    <section className='flex justify-between items-center px-4 py-3 border-b last:border-b-0 border-neutral-200 dark:border-neutral-700 even:bg-neutral-50 dark:even:bg-neutral-950/50 last:rounded-b-xl'>
      <div className='flex gap-2 items-center'>
        <ProfilePicture user={ user } size={ 32 } />
        <h1>{ user.name }</h1>
      </div>
      <p>{ user.email }</p>
      <p>{ user.role }</p>
      <div className='flex gap-2 items-center'>
        {
          user.role === 'ADMIN' ?
          <LinkButton href={'/admin/users/' + user.id + '/demote/'} variant={ LinkButtonVariant.WARNING } className='px-2'>
            Demote
          </LinkButton>
          :
          <LinkButton href={'/admin/users/' + user.id + '/promote/'} variant={ LinkButtonVariant.WARNING } className='px-2'>
            Promote
          </LinkButton>
        }
        <LinkButton href={'/admin/users/' + user.id + '/ban/'} variant={ LinkButtonVariant.DANGER } className='px-2'>
          Ban
        </LinkButton>
      </div>
    </section>
  )
}

export default UserCard