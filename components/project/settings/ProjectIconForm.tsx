"use client"
import Button, { ButtonVariant } from '@/components/ui/Button'
import ProjectPicture from '@/components/ui/ProjectPicture'
import React from 'react'

const ProjectIconForm = ({ projectId, icon }: { projectId: string, icon: string | null }) => {
  const [value, setValue] = React.useState(icon)
  const [done, setDone] = React.useState(false)
  const [error, setError] = React.useState<undefined | string>(undefined)

  const handleSave = async () => {
    try {
      const response = await fetch('/api/project/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectId, icon: value })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.parse(errorData.message)[0].message || 'Failed to save icon')
      }

      setDone(true)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleChoose = () => {
    var input = document.createElement('input') as HTMLInputElement
    input.type = 'file'
    input.accept = 'image/png, image/jpeg'
    input.click()

    input.onchange = async () => {
      if (!input.files) {
        setError('No file selected')
        return
      }

      const file = input.files[0]
      const formData = new FormData()
      formData.append("image", file)

      try {
        const response = await fetch('/api/image/upload', {
          method: "POST",
          body: formData,
        })

        if (response.status !== 201) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to save title')
        }

        const json = await response.json()
        setValue(json.url)
      } catch (err: any) {
        setError(err.message)
      }
    }
  }

  return (
    <section className='flex flex-col gap-2'>
      <h1>Project Icon</h1>
      { error ? <p className='
        bg-red-100 dark:bg-red-900 
        border border-red-300 dark:border-red-700 
        px-2 py-1 rounded text-center
        w-full
        h-screen md:h-auto
      '>{ error }</p> : <></> }
      <ProjectPicture project={ { id: projectId, title: '', ownerId: projectId, icon: value, createdAt: new Date(), description: '', updatedAt: new Date() } } size={ 128 } className='rounded-full' />
      <div className='flex gap-2'>
        { done ? <></> : 
          <>
            <Button onClick={ () => {
              const buffer = value
              setValue('') 
              setTimeout(() => { setValue(buffer) }, 1000)
            }} className='px-2' variant={ ButtonVariant.SUCCESS }>
              Refresh
            </Button>
            <Button onClick={ handleChoose } className='px-2'>
              Choose
            </Button>
          </>
        }
        <Button onClick={ handleSave } variant={ ButtonVariant.SUCCESS } className='px-2' disabled={ done }>
          { done ? 'Saved' : 'Save' }
        </Button>
      </div>
    </section>
  )
}

export default ProjectIconForm