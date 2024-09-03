import React from 'react'
import BackButton from './BackButton'

const CardHeaderWithBackButton = ({ title }: { title: string }) => {
  return (
    <header className='flex justify-between items-center'>
      <h1 className='text-2xl'>{ title }</h1>
      <BackButton />
    </header>
  )
}

export default CardHeaderWithBackButton