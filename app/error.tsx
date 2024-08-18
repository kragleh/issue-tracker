"use client"
import CardLayout from '@/components/misc/CardLayout'
import Link from 'next/link'
import React from 'react'

const ErrorPage = ({ error }: { error: Error }) => {

  return (
    <main className='h-screen w-full block md:flex items-center justify-center'>
      <CardLayout>
        <h1 className='text-center text-2xl font-semibold'>Application Error</h1>
        <p className='text-center text-neutral-700 dark:text-neutral-300'>{ error.message }</p>
        <button onClick={() => window.location.reload()} className='
          text-center
          text-neutral-700 dark:text-neutral-300 
          bg-neutral-200 hover:bg-neutral-300 
          dark:bg-neutral-800 dark:hover:bg-neutral-700 
          duration-200 px-4 py-2 rounded-xl
        '>
          Reload
        </button>
        <Link href={'https://kragleh.com'} className='text-xs text-center opacity-50'>{ new Date().getFullYear() } © Issue Tracker</Link>
      </CardLayout>
    </main>
  )
}

export default ErrorPage