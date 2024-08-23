import ProjectRow from '@/components/admin/projects/ProjectRow'
import Footer from '@/components/nav/Footer'
import Card from '@/components/ui/Card'
import { db } from '@/lib/db'
import React from 'react'

const AdminProjectsPage = async () => {
  const projects = await db.project.findMany({ take: 10 })

  return (
    <main className='w-full max-w-6xl mx-auto p-4'>
      <h1 className='text-2xl mb-4'>Projects</h1>
      <Card className='overflow-hidden'>
        {
          projects.map((project) => (<ProjectRow key={ project.id } project={ project } />))
        }
      </Card>
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default AdminProjectsPage