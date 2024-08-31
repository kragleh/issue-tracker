"use client"
import Button, { ButtonVariant } from '@/components/ui/Button'
import MDEditor from '@uiw/react-md-editor'
import React from 'react'

const DescriptionForm = ({ projectId, description }: { projectId: string, description: string }) => {
  const [value, setValue] = React.useState(description)
  const [done, setDone] = React.useState(false)
  const [error, setError] = React.useState<undefined | string>(undefined)

  const handleSave = async () => {
    try {
      const response = await fetch('/api/project/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectId, description: value })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.parse(errorData.message)[0].message || 'Failed to save description')
      }

      setDone(true)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <section className='flex flex-col gap-2'>
      <h1>Project Description</h1>
      { error ? <p className='
        bg-red-100 dark:bg-red-900 
        border border-red-300 dark:border-red-700 
        px-2 py-1 rounded text-center
        w-full
        h-screen md:h-auto
      '>{ error }</p> : <></> }
      <div className='flex flex-col gap-2'>
        <MDEditor value={ value } onChange={ content => setValue(content || '') } />
        <Button onCLick={ handleSave } variant={ ButtonVariant.SUCCESS } className='px-2' disabled={ done }>
          { done ? 'Saved' : 'Save' }
        </Button>
      </div>
    </section>
  )
}


export default DescriptionForm