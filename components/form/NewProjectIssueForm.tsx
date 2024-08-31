"use client"
import React from 'react'
import BackButton from '../ui/BackButton'
import MDEditor from '@uiw/react-md-editor'
import Footer from '../nav/Footer'
import Button, { ButtonVariant } from '../ui/Button'
import { Tag } from '@prisma/client'

const NewProjectIssueForm = ({ projectId }: { projectId: string }) => {
  const [error, setError] = React.useState<string | undefined>(undefined)
  const [content, setContent] = React.useState<undefined | string>("**Write your content here.**")
  const [tags, setTags] = React.useState<Tag[]>([])

  const onSubmit = () => {
    const titleElement = document.getElementById('title') as HTMLInputElement
    const title = titleElement.value

    fetch('/api/project/issues/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId,
        title,
        content,
      })
    }).then(res => {
      window.location.href = '/project/' + projectId + '/issues'
    }).catch(err => {
      console.log(err)
      setError(err.message)
    })
  }

  return (
    <main className='w-full max-w-4xl mx-auto p-4 flex flex-col gap-4'>
      <section className='flex justify-between items-center'>
        <h1 className='text-2xl'>New Issue</h1>
        <BackButton />
      </section>
      { error ? <p className='
        bg-red-100 dark:bg-red-900 
        border border-red-300 dark:border-red-700 
        px-2 py-1 rounded text-center
        w-full
      '>{ error }</p> : <></> }
      <section className='flex flex-col gap-2'>
        <h1>Title</h1>
        <input type="text" id="title" className='w-full rounded p-2'/>
      </section>
      <section className='flex flex-col gap-2'>
        <h1>Content</h1>
        <MDEditor
          value={ content }
          onChange={ setContent }
        />
      </section>
      <Button onClick={() => { onSubmit() }} variant={ ButtonVariant.SUCCESS }>
        Submit
      </Button>
      <Footer className='mt-4 w-full text-center' />
    </main>
  )
}

export default NewProjectIssueForm