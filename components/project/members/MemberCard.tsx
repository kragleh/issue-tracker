import Button, { ButtonVariant } from '@/components/ui/Button'
import ProfilePicture from '@/components/ui/ProfilePicture'
import { User } from '@prisma/client'
import React from 'react'

const MemberCard = ({ user, moderator }: { user: User, moderator: boolean }) => {
  return (
    <section className='flex justify-between items-center px-4 py-3 border-b last:border-b-0 border-neutral-200 dark:border-neutral-700 even:bg-neutral-50 dark:even:bg-neutral-950/50 last:rounded-b-xl'>
      <div className='flex gap-2 items-center'>
        <ProfilePicture user={ user } size={ 32 } />
        <h1 className='text-xl'>{ user.name }</h1>
      </div>
      <div className='flex gap-2 items-center'>
        {
          moderator ?
          <>
            <Button variant={ ButtonVariant.SUCCESS } className='px-2'>
              Edit
            </Button>
            <Button variant={ ButtonVariant.WARNING } className='px-2'>
              Remove
            </Button>
            <Button variant={ ButtonVariant.DANGER } className='px-2'>
              Ban
            </Button>
          </>
          :
          <></>
        }
      </div>
    </section>
  )
}

export default MemberCard