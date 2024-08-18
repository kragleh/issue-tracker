"use client"
import React from 'react'
import UserButton from './UserButton'
import { GiHamburgerMenu } from 'react-icons/gi'
import { User } from 'next-auth'
import ThemeSwitch from '../misc/ThemeSwitch'

const Header = ({ 
  openSidebar, 
  leftSide, 
  rightSide,
  user
}: { 
  openSidebar: (isOpen: boolean) => void, 
  leftSide?: React.ReactNode, 
  rightSide?: React.ReactNode,
  user: User
}) => {
  return (
    <section className='border-b border-neutral-300 dark:border-neutral-700 p-2 flex justify-between items-center'>
      <div className='flex items-center gap-2 ml-2'>
        <button onClick={ () => { openSidebar(true) }} className='lg:hidden hover:opacity-60 duration-200'>
          <GiHamburgerMenu size={ 24 } />
        </button>
        { leftSide }
      </div>
      
      <div className='flex items-center gap-2 mr-2'>
        { rightSide }
        <ThemeSwitch />
        <UserButton user={ user } />
      </div>
    </section>
  )
}

export default Header