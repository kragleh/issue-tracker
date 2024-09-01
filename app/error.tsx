"use client"
import CardLayout from '@/components/misc/CardLayout'
import Button, { ButtonVariant } from '@/components/ui/Button'
import LinkButton, { LinkButtonVariant } from '@/components/ui/LinkButton'
import Link from 'next/link'
import React from 'react'

const ErrorPage = ({ error }: { error: Error }) => {
  return (
    <main className='h-screen w-full block md:flex items-center justify-center'>
      <CardLayout>
        <h1 className='text-center text-2xl font-semibold'>Application Error</h1>
        <p className='text-center text-neutral-700 dark:text-neutral-300'>{ error.message }</p>
        <div className='flex flex-col gap-2'>
          <LinkButton href={'/'} variant={ LinkButtonVariant.SUCCESS } className='px-2'>
            Home
          </LinkButton>
          <Button onClick={() => window.location.reload()} variant={ ButtonVariant.WARNING }>
            Reload
          </Button>
        </div>
        <Link href={'https://kragleh.com'} className='text-xs text-center opacity-50'>{ new Date().getFullYear() } © Issue Tracker</Link>
      </CardLayout>
    </main>
  )
}

export default ErrorPage