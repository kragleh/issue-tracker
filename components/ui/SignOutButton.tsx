"use client"
import React from 'react'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <button className='text-neutral-700 dark:text-neutral-300 bg-red-500/20 hover:bg-red-500/30 duration-200 text-center py-1 rounded' onClick={() => { signOut() }}>
      Sign Out
    </button>
  )
}

export default SignOutButton