import { auth } from '@/auth'
import NewProjectIssueForm from '@/components/form/NewProjectIssueForm'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const NewProjectPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/project/' + params.id + '/issues/new')

  const project = await db.project.findUnique({ where: { id: params.id }, include: { owner: true } })

  if (!project) throw new Error('Project not found')

  return (
    <>
      <NewProjectIssueForm projectId={ project.id } />
    </>
  )
}

export default NewProjectPage