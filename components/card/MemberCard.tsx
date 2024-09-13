import ProfilePicture from '@/components/ui/ProfilePicture'
import { User } from '@prisma/client'
import React from 'react'
import LinkButton, { LinkButtonVariant } from '../ui/LinkButton'

const MemberCard = ({ user, edit, remove, ban }: { user: User, edit: boolean, remove: boolean, ban: boolean }) => {
  return (
    <section className='flex justify-between items-center px-4 py-3 border-b last:border-b-0 border-neutral-200 dark:border-neutral-700 even:bg-neutral-50 dark:even:bg-neutral-950/50 last:rounded-b-xl'>
      <div className='flex gap-2 items-center'>
        <ProfilePicture user={ user } size={ 32 } />
        <h1 className='text-xl'>{ user.name }</h1>
      </div>
      <div className='flex gap-2 items-center'>
        {
          edit ?
          <LinkButton href={'./members/' + user.id + '/edit'} variant={ LinkButtonVariant.SUCCESS } className='px-2'>
            Edit
          </LinkButton>
          :
          <></>
        }
        {
          remove ?
          <LinkButton href={'./members/' + user.id + '/remove'} variant={ LinkButtonVariant.WARNING } className='px-2'>
            Remove
          </LinkButton>
          :
          <></>
        }
        {
          ban ?
          <LinkButton href={'./members/' + user.id + '/ban'} variant={ LinkButtonVariant.DANGER } className='px-2'>
            Ban
          </LinkButton>
          :
          <></>
        }
      </div>
    </section>
  )
}

export default MemberCard