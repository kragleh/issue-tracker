"use client"
import React from 'react'
import { IoClose } from 'react-icons/io5'

const Sidebar = ({ 
  isOpen, 
  setIsOpen, 
  content 
}: { 
  isOpen: boolean, 
  setIsOpen: (isOpen: boolean) => void, 
  content: React.ReactNode 
}) => {
  return (
    <nav className={`
      ${ isOpen ? 'fixed' : 'hidden' }
      lg:block lg:fixed
      top-0 left-0 z-50
      w-72 h-screen max-h-full rounded-r-2xl lg:rounded-r-none
      bg-neutral-100 dark:bg-neutral-900 
    `}>
      <div className='p-4 flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Issue Tracker</h1>
        <button 
          className='lg:hidden hover:opacity-60 duration-200 m-2'
          onClick={() => { setIsOpen(false) }}>
          <IoClose size={ 24 } />
        </button>
      </div>

      <section className='overflow-y-scroll'>
        { content }
      </section>
    </nav>
  )
}

export default Sidebar