"use client"
import CardLayout from '@/components/misc/CardLayout'
import LinkButton, { LinkButtonVariant } from '@/components/ui/LinkButton'
import Link from 'next/link'
import React from 'react'

const FourOhFour = ({ error }: { error: Error }) => {
  return (
    <main className='h-screen w-full block md:flex items-center justify-center'>
      <CardLayout>
        <h1 className='text-center text-2xl font-semibold'>Not Found</h1>
        <LinkButton href={'/'} variant={ LinkButtonVariant.SUCCESS } className='px-2'>
          Home
        </LinkButton>
        <Link href={'https://kragleh.com'} className='text-xs text-center opacity-50'>{ new Date().getFullYear() } © Issue Tracker</Link>
      </CardLayout>
    </main>
  )
}

export default FourOhFour