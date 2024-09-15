import { auth } from '@/auth'
import FeatureCard from '@/components/home/FeatureCard'
import Footer from '@/components/nav/Footer'
import { LinkButtonVariant } from '@/components/ui/LinkButton'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import { BsGithub } from 'react-icons/bs'
import { FaProjectDiagram } from 'react-icons/fa'
import { MdChecklist } from 'react-icons/md'

const HomePage = async () => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/login?r=/')

  await promoteFirstAdmin()

  return (
    <main className='w-full max-w-6xl mx-auto p-4 flex flex-col gap-4'>
      <h1 className='text-2xl'>Home</h1>
      <FeatureCard 
        icon={ <FaProjectDiagram size={24} /> } 
        title='Projects' 
        description='Create a project, invite people, start tracking issues.' 
        link='/project/new' 
        action='New Project' 
        actionVariant={ LinkButtonVariant.SUCCESS } 
      />
      <FeatureCard 
        icon={ <MdChecklist size={24} /> } 
        title='Issues' 
        description='View issues you interacted with and discuss them.'
        link='/issues' 
        action='View Issues'
      />
      <FeatureCard 
        icon={ <BsGithub size={24} /> } 
        title='Open Source' 
        description='View the source code of this website on GitHub.'
        link='https://github.com/kragleh/issue-tracker'
        action='View Repository'
      />
      <Footer className='text-center' />
    </main>
  )
}

// Promote first user to admin
const promoteFirstAdmin = async () => {
  const users = await db.user.findMany({ take: 2 })
  if (users.length === 2 || users.length === 0) return
  const user = users[0]
  await db.user.update({
    where: { id: user.id },
    data: { role: 'ADMIN' }
  })
}

export default HomePage