import Card from '@/components/ui/Card'
import React from 'react'

const ActionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='h-screen w-full block md:flex items-center justify-center'>
      <Card className='w-full h-full rounded-0 border-0 md:rounded-xl md:border md:max-w-sm lg:max-w-md xl:max-w-xl md:h-fit p-4 flex flex-col gap-4'>
        { children }
      </Card>
    </main>
  )
}

export default ActionLayout