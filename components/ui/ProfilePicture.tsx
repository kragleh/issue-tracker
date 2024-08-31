import { User } from 'next-auth'
import Image from 'next/image'
import React from 'react'

const ProfilePicture = ({ user, size, className }: { user: User, size?: number, className?: string }) => {
  if (user.image) return (
    <Image alt={'pfp'} height={ 128 } width={ 128 } src={ user.image } className={'rounded-full ' + className } style={{ width: (size ? size : 16) + 'px', height: (size ? size : 16) + 'px' }} />
  )

  if (user.name) return (
    <div className={'bg-neutral-500 rounded-full flex items-center justify-center ' + className } style={{ width: (size ? size : 16) + 'px', height: (size ? size : 16) + 'px' }} >
      { user.name.charAt(0).toUpperCase() }
    </div>
  )

  return (
    <div className={'bg-neutral-500 rounded-full flex items-center justify-center ' + className } style={{ width: (size ? size : 16) + 'px', height: (size ? size : 16) + 'px' }} >
      ?
    </div>
  )
}

export default ProfilePicture