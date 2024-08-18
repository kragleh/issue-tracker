"use client"
import React from 'react'
import CardLayout from '../misc/CardLayout'
import { IoClose } from 'react-icons/io5'

const NewProjectForm = () => {
  const [error, setError] = React.useState('')

  const onClick = () => {
    const titleElement = document.getElementById('title') as HTMLInputElement
    const title = titleElement.value
    const descriptionElement = document.getElementById('description') as HTMLTextAreaElement
    const description = descriptionElement.value

    fetch('/api/project/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description
      })
    }).then(res => res.json()).then(data => {
      window.location.href = '/'
    }).catch(err => {
      console.log(err)
      setError(err.message)
    })
  }

  return (
    <main className='h-screen w-full block md:flex items-center justify-center'>
      <CardLayout>
        <div className='flex justify-between items-center'>
          <h1 className='text-center text-2xl font-semibold'>New Project</h1>
          <button onClick={ () => window.history.back() }>
            <IoClose size={ 24 } />
          </button>
        </div>
        { error ? <p className='
          bg-red-100 dark:bg-red-900 
          border border-red-300 dark:border-red-700 
          px-2 py-1 rounded text-center
          w-full md:max-w-sm 
          h-screen md:h-auto
        '>{ error }</p> : <></> }
        <input type="text" name="title" id="title" placeholder='My New Project' className='bg-neutral-800 rounded px-2 py-1 w-full'/>
        <textarea name="description" id="description" placeholder='This is my new project' className='bg-neutral-800 rounded px-2 py-1 w-full'/>
        <button onClick={ onClick } className='
          text-neutral-700 dark:text-neutral-300 
          bg-green-200 hover:bg-green-300 
          dark:bg-green-800 dark:hover:bg-green-700 
          duration-200 px-4 py-2 rounded-xl text-center
        '>
          Create
        </button>
      </CardLayout>
    </main>
  )
}

export default NewProjectForm