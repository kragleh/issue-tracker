"use client"
import { User } from 'next-auth'
import React from 'react'
import ProfilePicture from '../misc/ProfilePicture'
import { MdArrowDropDown } from 'react-icons/md'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const UserButton = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <span>
      <button onClick={() => setIsOpen(!isOpen)} className='flex items-center justify-between w-full gap-2 p-2 rounded-lg '>
        <ProfilePicture user={ user } size={ 32 } />
        <p className='hidden lg:block'>{ user.name }</p>
        <MdArrowDropDown className='hidden lg:block' size={ 24 } />
      </button>

      <section className={`
        ${ isOpen ? 'absolute' : 'hidden' }
        z-16 top-20 right-4
        flex flex-col gap-2 bg-neutral-300 dark:bg-neutral-900 rounded-xl
        p-2 w-32 border border-neutral-300 dark:border-neutral-700
      `}>
        <Link href='/profile' className='text-neutral-700 dark:text-neutral-300 bg-neutral-500/20 hover:bg-neutral-500/30 duration-200 text-center py-1 rounded'>Profile</Link>
        <button className='text-neutral-700 dark:text-neutral-300 bg-red-500/20 hover:bg-red-500/30 duration-200 text-center py-1 rounded' onClick={() => { signOut() }}>Sign Out</button>
      </section>
    </span>
  )
}

export default UserButton