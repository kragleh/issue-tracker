import React from 'react'

const SidebarGroup = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <section className='flex flex-col gap-4 p-4'>
      <h1 className='text-sm'>{ title }</h1>
      <div className='flex flex-col gap-2'>
        { children }
      </div>
    </section>
  )
}

export default SidebarGroup