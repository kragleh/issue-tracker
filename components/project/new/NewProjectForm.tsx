"use client"
import React from 'react'
import BackButton from '@/components/ui/BackButton'
import Button, { ButtonVariant } from '@/components/ui/Button'
import Footer from '@/components/nav/Footer'
import TextInput from '@/components/ui/TextInput'
import MDEditor from '@uiw/react-md-editor'

const NewProjectForm = () => {
  const [error, setError] = React.useState<undefined | string>(undefined)
  const [title, setTitle] = React.useState<string>('')
  const [description, setDescription] = React.useState<string | undefined>('# Markdown \n supported description.')

  const handleNewProject = async () => {
    try {
      const response = await fetch('/api/project/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.parse(errorData.message)[0].message || 'Failed to create project')
      }

      window.location.href = '/'
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <main className='w-full max-w-6xl mx-auto p-4 flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl'>New Project</h1>
        <BackButton />
      </div>
      { error ? <p className='
        bg-red-100 dark:bg-red-900 
        border border-red-300 dark:border-red-700 
        px-2 py-1 rounded text-center
        w-full
        h-screen md:h-auto
      '>{ error }</p> : <></> }
      <TextInput id='title' onChange={ (content) => setTitle(content) } placeholder='My New Project' />
      <MDEditor value={ description } onChange={ setDescription } />
      <Button onClick={ handleNewProject } variant={ ButtonVariant.SUCCESS } className='w-full'>
        Create Project
      </Button>
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default NewProjectForm