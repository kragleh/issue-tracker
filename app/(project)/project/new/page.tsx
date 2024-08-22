import { auth } from '@/auth'
import NewProjectForm from '@/components/form/NewProjectForm'
import { redirect } from 'next/navigation'
import React from 'react'

const NewProjectPage = async () => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/signin?r=/project/new')

  return (
    <NewProjectForm />
  )
}

export default NewProjectPage