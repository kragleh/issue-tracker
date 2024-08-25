import ProfilePicture from '@/components/ui/ProfilePicture'
import { Project, User } from '@prisma/client'
import React from 'react'

const ProjectOwnerCard = ({ user }: { user: User }) => {
  return (
    <section className='
      border border-neutral-300 dark:border-neutral-700 
      flex flex-row gap-4
      p-4 rounded-xl lg:mr-4
    '>
      <ProfilePicture user={ user } size={ 48 } />
      <div className='flex flex-col justify-center'>
        <h1 className='text-xl font-semibold'>Owner</h1>
        <p className='text-sm'>{ user.name }</p>
      </div>
    </section>
  )
}

export default ProjectOwnerCard