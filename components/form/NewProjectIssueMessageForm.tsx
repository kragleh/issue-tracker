"use client"
import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import Footer from '../nav/Footer'
import Button, { ButtonVariant } from '../ui/Button'
import { set } from 'zod'

const NewProjectIssueMessageForm = ({ projectId, issueId }: { projectId: string, issueId: string }) => {
  const [error, setError] = React.useState<string | undefined>(undefined)
  const [content, setContent] = React.useState<undefined | string>("**Write your content here.**")

  const onSubmit = () => {

    fetch('/api/project/issues/message/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId,
        issueId,
        content,
      })
    }).then(res => {
      if (res.ok) {
        window.location.reload()
        return
      }
      
      res.json().then(data => setError(data.message))
    }).catch(err => {
      console.log(err)
      setError(err.message)
    })
  }

  return (
    <>
      { error ? <p className='
        bg-red-100 dark:bg-red-900 
        border border-red-300 dark:border-red-700 
        px-2 py-1 rounded text-center
        w-full
      '>{ error }</p> : <></> }
      <section className='flex flex-col gap-2'>
        <h1>New Message</h1>
        <MDEditor
          value={ content }
          onChange={ setContent }
        />
      </section>
      <Button onClick={() => { onSubmit() }} variant={ ButtonVariant.SUCCESS }>
        Submit
      </Button>
      <Footer className='mt-4 w-full text-center' />
    </>
  )
}

export default NewProjectIssueMessageForm